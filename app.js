const loadServices=()=>{
  fetch("https://testing-8az5.onrender.com/services/")
  .then((res)=>res.json())
  .then((data)=>diplayservice(data))
  .catch((err)=>console.log(err));  
};

const diplayservice=(services)=>{
 services.forEach((service)=>{
    const parent=document.getElementById('service_container');
    const li=document.createElement('li');
    li.innerHTML=`
    <div class="card shadow h-100">
    <div class="ratio ratio-16x9">
        <img src=${service.image} class="card-img-top" loading="lazy" alt="...">
    </div>
    <div class="card-body p-3 p-xl-5">
        <h3 class="card-title h5">${service.name}</h3>
        <p class="card-text">${service.description.slice(0, 140)}</p>
        <div><a href="#" class="btn btn-primary">Details</a>
        </div>
    </div>
   </div>
    `;
    parent.appendChild(li)
 });
};

const loadDoctors = () => {
    fetch("https://testing-8az5.onrender.com/doctor/list/")
        .then((res) => res.json())
        .then((data) => {
            console.log(data?.results); // For debugging, check if data is received
            displayDoctors(data?.results); // Call displayDoctors inside this block
        })
        .catch((err) => console.log(err)); // Handle errors if any
};

// Assuming you call loadDoctors somewhere in your code

const displayDoctors = (doctorsList) => {
    if (!doctorsList) return; // Check if doctorsList is null or undefined

    doctorsList.forEach((doctor) => {
        // console.log(doctor); // Assuming you want to keep this for debugging

        const doctorsContainer = document.getElementById('doctors');
        if (!doctorsContainer) return; // Check if doctorsContainer is null or undefined

        const doctorCard = document.createElement('div');
        doctorCard.classList.add('doc-card');

        const doctorSpecializations = doctor.specialization
            ? doctor.specialization.map(specialization => `<button>${specialization}</button>`).join('')
            : '';

        doctorCard.innerHTML = `
            <img class="doc_img" src="${doctor.image}" alt="doctor">
            <h4>${doctor.full_name}</h4>
            <h6>${doctor.designation[0]}</h6>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae.</p>
            <p>${doctorSpecializations}</p>
            <button>Details</button>
        `;

        doctorsContainer.appendChild(doctorCard);
    });
};

const loadDoct=(search) => {
    document.getElementById('doctors').innerHTML ="";
    document.getElementById('spiner').style.display ="block";
    console.log(search);
    fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${search ? search:""} `)
        .then((res)=> res.json())
        .then((data)=>{ 
            // console.log(data);
            if(data.results.length>0){
                document.getElementById('nodata').style.display ="none";
                document.getElementById('spiner').innerHTML ='';
                displayDoc(data?.results);}
            else {
                document.getElementById('doctors').innerHTML ="";
                document.getElementById('nodata').style.display ="block";
                document.getElementById('spiner').style.display ="none";

            }
        })
        .catch((err) => console.log(err));
};

const displayDoc = (doct) => {
    if ( !doct) return;
    doct.forEach((doc) => {
        const parent=document.getElementById('doctors')
        const div=document.createElement("div")
        div.classList.add("doc-card")
        div.innerHTML=`
        <img class="doc_img" src="${doc?.image}" alt="doctor">
        <h4>${doc?.full_name}</h4>
        <h6>${doc?.designation[0]}</h6>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae.</p>
        <p>${doc?.specialization.map((items)=>{
            return `<button>${items}</button>`;
    })}</p>
    <button><a target="_blank" href="docdetails.html?doctorId=${doc.id}">Details</a></button> 
        `;
    parent.appendChild(div);
    })

};

const loadDesignation=() => {
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then((res) => res.json())
    .then((data) =>{
        data.forEach((item) => {
            const parent=document.getElementById('drop-deg');
            const li=document.createElement('li')
            li.classList.add("dropdown-item");
            li.innerText=item?.name;
            parent.appendChild(li);

        });
    })
    .catch((err) => console.log(err));
};
const loadSpesicalist=() => {
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then((res) => res.json())
    .then((data) =>{
        data.forEach((item) => {
            const parent=document.getElementById('drop-sep');
            const li=document.createElement('li')
            li.classList.add("dropdown-item");
            li.innerHTML=`
            <li onclick="loadDoct('${item.name}')">${item?.name}</li> 
            `;
            parent.appendChild(li);

        });
    })
    .catch((err) => console.log(err));
};

const handleSearch=() => {
    const value=document.getElementById('search').value;
    loadDoct(value);
    
 
};

const loadReviews=() => {
    fetch("https://testing-8az5.onrender.com/doctor/review/")
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        displayReviews(data);
    })
    .catch((err) => console.log(err));

};

const displayReviews=(reviews) => {
    reviews.forEach((review) =>{
        const parent=document.getElementById('review_container');
        const div=document.createElement('div');
        div.classList.add('review-card');
        div.innerHTML=`
        <img src="./images/review1.jpg" alt="">
        <h4>${review.reviewer}</h4>
        <p>${review.body.slice(0,100)}</p>
        <h6>${review.rating}</h6>
        <h6>${review.created_on}</h6>
        
        `;
        parent.appendChild(div);
    })
};




loadDoct();
loadServices();
// loadDoctors();
loadDesignation();
loadSpesicalist();
loadReviews();