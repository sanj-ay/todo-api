function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

var activeItem=null

buildList()
clear()
clearCompleted()

function buildList() {

    var wrapper=document.getElementById('sub-container3')
    
    wrapper.innerHTML=''

    var url= 'http://127.0.0.1:8000/api/task-list'


    fetch(url)
    .then((resp)=>resp.json())
    .then(function(data){
        console.log('Data:',data)

        var list=data
        for (var i in list) {

            var title=`<span class="text-box">${list[i].text}</span>`
            if (list[i].completed== true){
                title=`<span class="text-box" style="text-decoration: line-through">${list[i].text}</span>`
            }
            
            var item = ` 
            <div class='sub-container4'>
                ${title}
                <button class="individual-1">Edit</button>
                <button class="individual-2">-</button>
            <div>
                
                `
                
                




            
            wrapper.innerHTML +=item

          

        }
        for (var i in list){
            var editBtn= document.getElementsByClassName('individual-1')[i]
            var delBtn=document.getElementsByClassName('individual-2')[i]
            var task=document.getElementsByClassName('text-box')[i]
            
            editBtn.addEventListener('click',(function(item){
                return function(){
                    editItem(item)
                }
                

            })(list[i]))

            
            delBtn.addEventListener('click',(function(item){
                return function(){
                    deleteItem(item)
                }
            })(list[i]))



            task.addEventListener('click', (function(item){
                return function (){
                    strikeUnstrike(item)
                }
            })(list[i]))                       
        }

        

           
        

    })
}

    var form= document.getElementById('sub-container1')
    form.addEventListener('submit',function (e){
        e.preventDefault()
        console.log('Form submitted')
        var url='http://127.0.0.1:8000/api/create-task'
        if (activeItem !=null){
            url=`http://127.0.0.1:8000/api/update-task/${activeItem.id}`
            activeItem=null
        }
        var text=document.getElementById('field').value
        fetch(url,{
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({'text':text})
    }
    ).then(function(response) {

        buildList()
        document.getElementById('sub-container1').reset()
        
    })
})
function editItem(item){
    console.log('Item clicked',item)
    activeItem=item
    document.getElementById('field').value=activeItem.text
}

function deleteItem(item){
    console.log('Item Deleted',item)
    url=`http://127.0.0.1:8000/api/delete-task/${item.id}`
    fetch(url,{
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        }


    }).then((response)=> {
        buildList()

    })

    

}

function clear(){
    var clr=document.getElementById('clear-btn')
    clr.addEventListener('click', function(){
        console.log("Clear Button Clicked")
        url='http://127.0.0.1:8000/api/clearall'
        fetch(url,{
            method: 'DELETE',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            }
        }).then((resp)=> {

            buildList()
        })

    })
    
}

function strikeUnstrike (item) {
    console.log("Strike Clicked")
    item.completed = !item.completed
    url=`http://127.0.0.1:8000/api/update-task/${item.id}`

    

    fetch(url,{
            method: 'POST',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({'text':item.text,'completed':item.completed})

        }).then((resp)=> {

            buildList()
        })



}

function clearCompleted(){

    var clr=document.getElementById('rm-btn')
    clr.addEventListener('click', function(){
    console.log("Clear Button Clicked")
    url='http://127.0.0.1:8000/api/remove-completed'
    fetch(url,{
        method: 'DELETE',
        headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            }
        }).then((resp)=> {

            buildList()
        })

    })
}


