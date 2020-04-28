import React,{useEffect, useState} from 'react'
import RestaurantService from '../../api/todo/RestaurantService'
import AuthenticationService from '../restaurant/AuthenticationService.js'
import { Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';



const QueueList = (props) =>{
    const[queue, setQueue] = useState([]);
    const[message, setMessage] = useState(null);
    const[modal, setModal] = useState(false);
    const[joinQueueInfo, setJoinQueueInfo] = useState({
        firstName : '',
        lastName : '',
        phone : '',
        partySize : '',
        timestamp : ''
    })
    const {
        buttonLabel,
        className
      } = props;

      
    const toggle = () => setModal(!modal);

    const refreshQueue = () => {
        let username = AuthenticationService.getLoggedInUserName()

        console.log(username);
        RestaurantService.getQueue(username)
        .then(
            response => {
                console.log(username);
                const updatedQueue= response.data;
                setQueue(updatedQueue);
            }
        )
    }

    useEffect(() =>{
        refreshQueue();
    },[])

    const addChangeHandler = (event) =>{
        const updatedJoinQueueInfo = {...joinQueueInfo}
        updatedJoinQueueInfo[event.target.name] = event.target.value;
        setJoinQueueInfo(updatedJoinQueueInfo);
        console.log(joinQueueInfo);
    }

    const AddButtonHandler = (event) =>{
        toggle();
        const time = new Date();


    
        const updatedJoinQueueInfo = {...joinQueueInfo}
        updatedJoinQueueInfo["timestamp"] = time;

        setJoinQueueInfo(updatedJoinQueueInfo);

        let username = AuthenticationService.getLoggedInUserName()
        console.log(updatedJoinQueueInfo);

        RestaurantService.joinQueue(username, updatedJoinQueueInfo)
        .then(response => {
            refreshQueue()
        })

    }
    
    const deleteQueueClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName()
        console.log("deleteQueueClicked" + id);
        RestaurantService.deleteQueue(username, id)
        .then(
            response => {
                setMessage({ message: `Delete of queue ${id} Successful` })
                refreshQueue()
                }
            )
    }


    return (
        <div>
            {console.log("Queue")}
        <h1>Queue</h1>
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Queue</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Party Size</th>
                        <th>Time</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        queue.length <= 0 ? null : queue.map(
                            (partyInQueue, index) =>
                                <tr key={partyInQueue.id} >
                                    <td>{index + 1}</td>
                                    <td>{partyInQueue.firstName}</td>
                                    <td>{partyInQueue.lastName}</td>
                                    <td>{partyInQueue.partySize}</td>
                                    <td>{partyInQueue.timestamp}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteQueueClicked(partyInQueue.id)}>Delete</button></td>
                                </tr>
                        )

                    }
                </tbody>
            </table>
            <div className="row">
                <Button onClick = {toggle}>Add</Button>
            </div>
            
            <div>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Add Table</ModalHeader>
                <ModalBody>
                    <div>
                        <input type = 'text' placeholder = "First Name" name = 'firstName' onBlur={addChangeHandler}/>
                        <input type = 'text' placeholder = "Last Name"  name = 'lastName'onBlur={addChangeHandler}/>    
                    </div>
                    <div>
                        <input type = 'text' placeholder = "phone" name = 'phone' onBlur={addChangeHandler}/>
                        <input type = 'text' placeholder = "Party Size"  name = 'partySize'onBlur={addChangeHandler}/>
                    </div>  
                </ModalBody>
                <ModalFooter>
                    <Button color="Primary" onClick={AddButtonHandler}>Add</Button>
                </ModalFooter>
                </Modal>
            </div>


        </div>


        </div>
    );

}
export default QueueList;