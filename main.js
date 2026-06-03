let tableauIdees=[]
const stockIdees="idees"
let lesIdees = document.getElementById("idees")
let indexModification=-1








// Fonction pour suggérer avec Ollama
async function suggererAvecOllama() {
    const titre = document.getElementById('titre').value;
    if (titre.length < 3) return;
    
    try {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'mistral',
                prompt: `Choisis une catégorie pour: "${titre}". Réponds par: pedagogie, evenement, vie-campus, ou autre`,
                stream: false
            })
        });
        
        const data = await response.json();
        let categorie = data.response.trim().toLowerCase();
        
        // Nettoie la réponse
        if (categorie.includes('pedagogie')) categorie = 'pedagogie';
        else if (categorie.includes('evenement')) categorie = 'evenement';
        else if (categorie.includes('vie-campus')) categorie = 'vie-campus';
        else categorie = 'autre';
        
        // Applique la suggestion
        document.getElementById('categorie').value = categorie;
        
    } catch (error) {
        console.log('Ollama indisponible');
    }
}

// // Règles locales de secours (si Ollama ne marche pas)
// function suggererCategorieLocale(titre) {
//     const t = titre.toLowerCase();
//     if (t.includes('cours') || t.includes('étude')) return 'pedagogie';
//     if (t.includes('fête') || t.includes('soirée')) return 'evenement';
//     if (t.includes('campus') || t.includes('bâtiment')) return 'vie-campus';
//     return 'autre';
// }


function sauvegarde(){
    localStorage.setItem(stockIdees, JSON.stringify(tableauIdees))
}

function recuperer(){
    const ideeRecup= localStorage.getItem(stockIdees)
    if (ideeRecup){
        tableauIdees=JSON.parse(ideeRecup)
    }

}


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

    }sauvegarde()
    
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
    sauvegarde()
    afficherIdees()
}

function modifierIdee(idAmodifier){
    let ideeAtrouver = tableauIdees.find(idee =>idee.id===idAmodifier)
    document.getElementById("titre").value=ideeAtrouver.titre,
    document.getElementById("categorie").value=ideeAtrouver.categorie,
    document.getElementById("description").value=ideeAtrouver.description
    indexModification=idAmodifier
}





//  Quand on tape dans le titre, Ollama suggère 
const inputTitre = document.getElementById('titre');
inputTitre.addEventListener('input', function() {
    suggererAvecOllama();
});


recuperer()
afficherIdees()