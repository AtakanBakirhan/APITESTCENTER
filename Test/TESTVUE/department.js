const department={template:`
<div>

<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
  Add Department
</button>


<table class="table table-striped">
<thead>
    <tr>
        <th>
            DepartmentId
        </th>
        <th>
            DepartmentName
        </th>
        <th>
            Options
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="dep in departments">
        <td>{{dep.DepartmentId}}</td>
        <td>{{dep.DepartmentName}}</td>
        <td>
            <button type="button" class="btn btn-light mr-1" 
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(dep)">düzenle</button>
            <button type="button" 
            class="btn btn-light mr-1"
            @click="deleteClick(dep.DepartmentId)">sil</button>
        
        </td>
    </tr>
</tbody>

</table>

<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="axampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="buton" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>
    <div class="modal-body">

        <div class="input-group mb-3">
            <span class="input-group-text">Department Name</span>
            <input type="text" class="form-control" v-model="DepartmentName">
        </div>

        <button type="button" @click="createClick()"
        v-if="DepartmentId==0" class="btn btn-primary">
        Create
        </button>
        <button type="button" @click="updateClick()"
        v-if="DepartmentId!==0" class="btn btn-primary">
        update
        </button>

    </div>


</div>
</div>
</div>

</div>
`,
data(){
    return{
        departments:[],
        
        modalTitle:"",
        DepartmentName:"",
        DepartmentId:0
        
    }
},
methods: {
    refreshData(){
        axios.get(variables.API_URL+"department")
        .then(response=>this.departments=response.data)
        
    },
    addClick(){
        this.modalTitle="Add Department";
        this.DepartmentId=0;
        this.DepartmentName="";
    },
    editClick(dep){
        this.modalTitle="edit Department";
        this.DepartmentId=dep.DepartmentId;
        this.DepartmentName=dep.DepartmentName;
    },
    createClick(){
        axios.post(variables.API_URL+"department", {
            DepartmentName:this.DepartmentName
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick(dep){
        axios.put(variables.API_URL+"department", {
            DepartmentId:this.DepartmentId,
            DepartmentName:this.DepartmentName
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(variables.API_URL+"department/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    }
},
mounted:function() {
    this.refreshData();
},


}
