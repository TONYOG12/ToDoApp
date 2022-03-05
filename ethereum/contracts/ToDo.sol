// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;


contract ToDoApp{
    address[] public  createdToDo;

    function createToDo() public {
        address newToDo = address(new ToDo(msg.sender));
        createdToDo.push(newToDo);
    } 

    function getCreatedToDoLists() public view returns(address[] memory){
        return createdToDo;
    }
}



contract ToDo {

    struct List {

        bool active;
        string name;
    }

    struct Task{
        string name;
        uint listId;
        string description;
        string day;
        bool active;
        bool completed;
    }

    event TaskCreated(
        string name,
        string description,
        bool created

    );

    event TaskCompleted (
        uint id,
        bool completed
    );

    event TaskDeleted (
        uint id,
        bool deleted
    );

    address public creator;
    mapping(uint => List) public lists;
    mapping(uint => Task) public tasks;

    uint numOfLists;
    uint numOfTasks;

    modifier restricted () {
        require(msg.sender == creator, "You did not create this to do list");
        _;
    }

    constructor(address sender)
    {
        creator = sender;
    }

    function CreateList(string memory name) public {

        List storage newList = lists[numOfLists++];
        newList.name = name;
        newList.active = true;

    }

    function DeletList(uint id) public restricted {
        lists[id].active = false;
    }

    function CreateTask(string memory name, string memory description, string memory day, uint ListId) public restricted {

        Task storage newTask = tasks[numOfTasks++];
        newTask.name = name;
        newTask.description = description;
        newTask.listId = ListId;
        newTask.day = day;
        newTask.active = true;
        newTask.completed = false;


        emit TaskCreated(name, description, true);

    }

    function DeleteTask(uint id) public restricted {
        tasks[id].active = false;

        emit TaskDeleted(id, true);

    }

    function CompleteTask(uint id) public restricted {

        tasks[id].completed = true;

        emit TaskCompleted(id, true);
    }


}