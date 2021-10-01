import React from 'react';
import 'antd/dist/antd.css';
import { Card, Col, Divider, Row} from 'antd';
import * as api from "../../api/TasksApi";
import '../../App.css';
import { DeleteOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import moment from 'moment';

class CompletedTasksForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
        this.loadTasks = this.loadTasks.bind(this);
    }
    componentDidMount(){
        this.loadTasks();
    }
    loadTasks(){
        api.getAlltasks("COMPLETED", {
            onSuccess: (response) => {
                this.setState({tasks: response})
            },
            onErorr: (error) => {
                console.error(error);
            }
        })
    }
    deleteTask(id){
        api.deleteTask(id, true, {
            onSuccess: (response) => {
                this.loadTasks();
            },
            onErorr: (error) => {
                console.error(error);
            }
        })
    }
    updateTask(task){
        api.updateTask(task, "ACTIVE", {
            onSuccess: (response) => {
                this.loadTasks();
            },
            onErorr: (error) => {
                console.error(error);
            }
        })
    }
    render () {
        return (
            <div id="task_form">
                <Row gutter={[16, 16]}>
                {
                    this.state.tasks.sort(function (a, b) {
                                if (a.updateDate < b.updateDate) {
                                    return 1;
                                }
                                if (a.updateDate > b.updateDate) {
                                    return -1;
                                }
                                return 0;
                            })  
                        .map(task => {
                        return (
                            <Col span={6} key={"col_" + task.id}>
                                <Card hoverable key={"card_" + task.id}
                                    title={"Task " + task.id} 
                                    actions={[
                                        <IssuesCloseOutlined key="uncomplete"  onClick={() => this.updateTask(task)} style={{color: "blue"}}/>,
                                        <DeleteOutlined key="delete" onClick={() => this.deleteTask(task.id)} style={{color: "red"}}/>
                                    ]}>
                                    <p><b>Task:</b> {task.task}</p>
                                    <p><b>Description:</b> {task.description}</p>
                                    <Divider/>
                                    <p><b>Created: </b>{moment(task.creationDate).format('LLLL')}</p>
                                    <p><b>Updated: </b>{moment(task.updateDate).format('LLLL')}</p>
                                </Card>
                            </Col> 
                        )
                    })
                }
                </Row>
            </div>
        );
    }
}
export default CompletedTasksForm;