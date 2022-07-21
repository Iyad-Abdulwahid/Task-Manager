import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
    console.log(task)
return (
    <div
    className={`task ${task.reminder && 'reminder'}`}
    onDoubleClick={() => onToggle(task.id)}
    >
    <h3>
        {task.text}{' '}
        <FaTimes
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => onDelete(task.id)}
        />
    </h3>
    <p>{task.day}</p>
    <p><em>"{task.quote}"</em></p>
    </div>
)
}

export default Task