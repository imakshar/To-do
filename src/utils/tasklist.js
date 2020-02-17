const taskList = [{
    id:1,
    task: "this is Task",
    status:true,
    createdAt : new Date(),
      completedAt : null 
},{
    id:2,
    task: "this is Task",
    status:false,
    createdAt : new Date(),
    completedAt : null 
},{
    id:3,
    task: "this is Task",
    status:true,
    createdAt : new Date(),
    completedAt : null 
},
{
    id:4,
    task: "this is Task",
    status:false,
    createdAt : new Date(),
    completedAt : null 
}
,{
    id:5,
    task: "this is Task",
    status:false,
    createdAt : new Date(),
    completedAt : null 
}]

export function getTask(){
    return taskList
}