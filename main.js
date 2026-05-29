let tableauIdees=[]
let lesIdees = document.getElementById("idees")
let indexModification=-1

const formulaire = document.getElementById("ideeForm")
formulaire.addEventListener('submit', function(e){
    e.preventDefault()
    titre= document.getElementById("titre")
    console.log(titre.value)
    categorie=document.getElementById("categorie")
    console.log(categorie.value)
    description=document.getElementById("description")
    console.log(description.value)
    
    const idee={
    id: Date.now(),
    titre: titre.value,
    categorie: categorie.value,
    description: description.value
}
    if (indexModification ===-1){
        tableauIdees.push(idee)
    }else{
        const position = tableauIdees.findIndex(i => i.id === indexModification)
        tableauIdees[position]={ 
            id: indexModification,
            titre: titre.value,
            categorie: categorie.value,
            description: description.value}
        indexModification = -1;

    }
    
    afficherIdees()
    console.log(idee)
    console.log(tableauIdees)

    titre.value = ""
    categorie.value=""
    description.value=""
})


function afficherIdees(){
   lesIdees.innerHTML="";
   for(let i=0; i< tableauIdees.length; i++){
        const maCarte=document.createElement("div")
        maCarte.className = "p-4 rounded-lg shadow-md mb-4"
        
        maCarte.innerHTML=`
        <p>${[tableauIdees[i].titre]}</p>
        <p class="text-sm text-gray-600 mb-2">${[tableauIdees[i].categorie]}</p>
        <p class="text-gray-700 mb-4">${[tableauIdees[i].description]}</p>
        <button type="submit" class="bg-teal-700 hover:bg-teal-800 text-white px-3 py-1 rounded" onclick="modifierIdee(${[tableauIdees[i].id]})">Modifier</button>
        <button type="button" class="bg-red-900 hover:bg-red-950 text-white px-3 py-1 rounded" onclick="supprimerIdee(${[tableauIdees[i].id]})">Supprimer</button>`
        if(tableauIdees[i].categorie==="pedagogie"){
            maCarte.classList.add("bg-blue-100")
        }else if(tableauIdees[i].categorie==="evenement"){
            maCarte.classList.add("bg-green-100")
        }else if(tableauIdees[i].categorie==="vie-campus"){
            maCarte.classList.add("bg-purple-100")
        }else {
            maCarte.classList.add("bg-yellow-100")
        }
        lesIdees.appendChild(maCarte)

   }
}


function supprimerIdee(idIdeeAsupprimer){
    tableauIdees= tableauIdees.filter(idee => idee.id !==idIdeeAsupprimer)
    afficherIdees()
}

function modifierIdee(idAmodifier){
    let ideeAtrouver = tableauIdees.find(idee =>idee.id===idAmodifier)
    document.getElementById("titre").value=ideeAtrouver.titre,
    document.getElementById("categorie").value=ideeAtrouver.categorie,
    document.getElementById("description").value=ideeAtrouver.description
    indexModification=idAmodifier

}


