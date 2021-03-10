import fetch from "node-fetch";



function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.analyzeText(formText)
    console.log("::: Form Submitted yes :::")
    console.log(formText)
}


function analyzeText(formtext){
    fetch('http://localhost:8082/accessapi',{
        
        method:'POST',
        credentials:'same-origin',
        mode:'cors',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify()
       
    })
    .then(console.log('fetchsuccessful'))
    .then(res=>res.json())
    .then(function(res){
        let element=document.getElementById('results');
        
        console.log(element)
        Client.updateUI(element,res);
    })
}

function updateUI(element,content){
    if(content.confidence==undefined){
        element.innerHTML='This text cannot be analyzed'
    }
    else{
        element.innerHTML=`Agreement is :${content.agreement}, Subjectivity is:${content.subjectivity}, Confidence is :${content.confidence}, Irony is:${content.irony}`
    }
}

export {handleSubmit}
export {analyzeText}
export {updateUI}

