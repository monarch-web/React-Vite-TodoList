import './TodoItem.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PropTypes from 'prop-types';



function TodoItem({ id, title, max, currentValue, changeValue, deleteTask }) {

    let currentValueInPercent = parseFloat(currentValue / max * 100).toFixed(0);
   
    function Progress() {
        const now = currentValueInPercent;
        return <ProgressBar className='w-100 mb-3'  now={currentValue} label={`${now}%`} max={max} />;
      }
    function addStage() {
        changeValue(id, currentValue + 1);
        Progress(currentValue);
    }

    function deleteTodo() {
        deleteTask(id)
    }


    return (
        <div    
            id={id} 
            className={
            `todoItem d-flex w-50 flex-wrap justify-content-center flex-coluflex-grow-1 
            ${currentValueInPercent >= 75 ? 'bg-success': currentValueInPercent <= 25 ? 'bg-danger' : 'bg-warning'}` 
        }>
            <h2 className='text-left w-100'>{title}</h2>
            <hr />
            <Progress />
            <span className='mr-auto'>Current stage: {currentValue}/{max}</span>
            <hr />
            <div className='w-100'>
                <div className='d-flex justify-content-between'>
                    {currentValue === max ? <strong>Well done!</strong> : 
                    <button className='btn btn-secondary d-flex w-100 w-auto' onClick={addStage}>Add stage</button> }
                    <button 
                        className='btn btn-light d-flex w-auto'
                        onClick={deleteTodo}
                        >Delete</button>   
                </div>             
            </div>
        </div>
    );
}

TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    currentValue: PropTypes.number.isRequired,
    changeValue: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    currentVal: PropTypes.number
}

export default TodoItem;