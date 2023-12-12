import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {InputGroup, Form, Button} from 'react-bootstrap';
import { v4 as idGen } from 'uuid';

function CreateTodo ( {addTask} ) {

    let [inputTitle, setInputTitle] = useState('');
    let [inputMax, setInputMax] = useState(0);
    let [additionField, setAdditionField] = useState(false);
    let [current, setCurrent] = useState(0)

    // useRef() позволяет получить желаемый элемент из DOM без необходимости блуждать между элементами DOM
    let form = useRef()
    let additionFieldDom = useRef();

    // useEffect срабатывает каждый раз когда указанный массив зависимостей изменился
    useEffect(() => {
        // Сработало событие
    }, [inputTitle])

    function handleSubmit(e) {
        e.preventDefault()

        // Проверка введеных зачений
        if(inputTitle === '' || parseInt(inputMax) <= 0 || current > parseInt(inputMax)) return
        addTask({
            id: idGen(), // Генерация идет для уникальности, но выдает ошибку так как React ожидает number.
            title: inputTitle,
            min: 0,
            max: parseInt(inputMax),
            value: additionFieldDom === false ? null : parseInt(current),
        })
        setInputTitle('');
        setInputMax(0);

    }

    // Обработчики ввода значения. Срабатывают при изменении инпута
    function titleInputChange(e) {
        setInputTitle(e.target.value)
    }

    function maxInputChange(e) {
        setInputMax(e.target.value)
    }


    function showField() {
        setAdditionField(!additionField)
    }

    useEffect(() => {
        additionField ? additionFieldDom.current.focus() : setCurrent(0)
    }, [additionField])


    function setCurrentValue(e) {
        setCurrent(e.target.value)
    }

    return (
        <form className='row' ref={form}>
            <InputGroup className="mb-3 mt-3 w-50">
                <InputGroup.Text id="basic-addon1">Заголовок</InputGroup.Text>
                <Form.Control
                onChange={(e) => titleInputChange(e)}
                value={inputTitle}
                placeholder="Заголовок"
                aria-label="Заголовок"
                aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3 mt-3 w-50">
                <InputGroup.Text id="basic-addon2">Максимальное значение</InputGroup.Text>
                <Form.Control
                onChange={(e) => maxInputChange(e)}
                value={inputMax}
                placeholder="max"
                type='number'
                aria-label="Заголовок"
                aria-describedby="basic-addon2"
                />
            </InputGroup>
            <div className="addition__field m-auto">
                <label htmlFor="checkbox" >Показать дополнительное поле</label>
                <input type="checkbox" name="add__field" id="checkbox" onChange={showField}/>
                <hr />
                {
                    additionField &&
                    <InputGroup className="mb-3 mt-3 w-50">
                        <InputGroup.Text id="basic-addon1">Этапы задачи</InputGroup.Text>
                        <Form.Control ref={additionFieldDom} onChange={e => setCurrentValue(e)} value={current} type='text'/>
                    </InputGroup>
                }
            </div>
            <Button
                className='w-auto m-auto' 
                variant="primary" 
                type="submit"
                onClick={handleSubmit}
            >Добавить задачу</Button>
        </form>
    );
    }

CreateTodo.propTypes = {
    addTask: PropTypes.func,
    items: PropTypes.array
};


export default CreateTodo;
