import React, {useEffect, useState} from 'react';
import RestaurantService from '../../api/todo/RestaurantService.js'
import AuthenticationService from '../restaurant/AuthenticationService.js'
import { Button,Modal, ModalHeader, ModalBody, ModalFooter,Alert } from 'reactstrap';
import { ReadStream } from 'tty';

 

const TableList = (props) =>{
    const[tables, setTables] = useState([]);
    const[message, setMessage] = useState(null);
    const[modal, setModal] = useState(false);
    const[addTableInfo, setAddTableInfo] = useState({
        "minSize" : 0,
        "maxSize" : 0
    })
    const[deleteClicked, setDeleteClicked] = useState(false);

    const {
        buttonLabel,
        className
      } = props;

    const toggle = () => setModal(!modal);

    const refreshTables = () => {
        let username = AuthenticationService.getLoggedInUserName()

        console.log(username);
        RestaurantService.getAllTables(username)
        .then(
            response => {
                console.log(username);
                const updatedTables = response.data;
                setTables(updatedTables)
            }
        )
    }

    useEffect(() =>{
        refreshTables();
    },[])

    
    const AddButtonHandler = (event) =>{
        toggle();
        let username = AuthenticationService.getLoggedInUserName()
        RestaurantService.addTable(username, addTableInfo)
        .then(response => {
            refreshTables()
        })

    }

    const addChangeHandler = (event) =>{
        const updatedAddTableInfo = {...addTableInfo}
        updatedAddTableInfo[event.target.name] = event.target.value;
        setAddTableInfo(updatedAddTableInfo);
        console.log(addTableInfo);
    }
    
    const deleteTableClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName()
        console.log("deleteTableClicked" + id);
        RestaurantService.deleteTable(username, id)
        .then(
            response => {
                setMessage({ message: `Delete of table ${id} Successful` })
                refreshTables()
                }
            )
    }

    const updateTableAvailabilityClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName()
        console.log("updateTableAvailability" + id);
        RestaurantService.updateTableAvailability(username, id)
        .then(
            response => {
                console.log("updateTableAvailability" + id);

                setMessage({ message: `update of table ${id} Successful` })
                refreshTables()
                }
            )
    }


    return (
        <div>
            {console.log("tables page")}
        <h1>List Tables</h1>
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Table</th>
                        <th>Min size</th>
                        <th>Max size</th>
                        <th>Availability</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tables.length <= 0 ? null : tables.map(
                            (table, index) =>
                                <tr key={table.id} >
                                    <td>{index + 1}</td>
                                    <td>{table.minSize}</td>
                                    <td>{table.maxSize}</td>
                                    {(!table.availability) &&
                                    <td><button className="table-not-available" onClick={() => updateTableAvailabilityClicked(table.id)}> </button></td>
                                    }
                                    {(table.availability) &&
                                    <td><button className="table-available" onClick={() => updateTableAvailabilityClicked(table.id)}> </button></td>
                                    }
                                    <td><button className="btn btn-warning" onClick={() => deleteTableClicked(table.id)}>Delete</button></td>
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
                    <input type = 'text' placeholder = "Minimum Size" name = 'minSize' onBlur={addChangeHandler}/>
                    <input type = 'text' placeholder = "Maximum Size"  name = 'maxSize'onBlur={addChangeHandler}/>
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
export default TableList;