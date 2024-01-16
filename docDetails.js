const getParams=()=>{
    const params= new URLSearchParams(window.location.search).get('doctorId');
    loadTime(params)
    fetch(`https://testing-8az5.onrender.com/doctor/list/${params}`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        doctorDetails(data);
    });
        fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${params}`)
        .then((res)=> res.json())
        .then((data)=>{
            docReviews(data);
        })

};

const docReviews=(reviews) => {
    reviews.forEach((review) =>{
        const parent=document.getElementById('doc-review');
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


const doctorDetails=(doctor)=>{
    const parent=document.getElementById("doc-details")
    const div=document.createElement("div");
    div.classList.add("doc-detail_container");
    div.innerHTML=`
    <div class="doct-img">
        <img src=${doctor.image} alt="">
    </div>
    <div class="doc-info">
        <h1>${doctor.full_name}</h1>
        ${doctor.specialization.map((item)=>{
            return `<button class="doc-detail-btn">${item}</button>`
        })}
        ${doctor.designation.map((item)=>{
            return `<h4>${item}</h4>`
        })}
        <p class="w-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, dicta.</p>
        <h4>Fees :${doctor.fee} </h4>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Take Appointment
  </button>
  
    </div>

    `;
    parent.appendChild(div);

    
};

const loadTime=(id)=>{
    fetch(`https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        data.forEach((item)=>{
            const parent=document.getElementById("avail-time");
            const option=document.createElement("option");
            option.value=item.id;
            option.innerText=item.name;
            parent.appendChild(option);

        });
    })

}

const handleAppointment=()=>{
    const params= new URLSearchParams(window.location.search).get('doctorId');
    const status=document.getElementsByName("status");

    const selected=Array.from(status).find((button)=>button.checked);
    const symptom=document.getElementById("symptom").value;
    const time =document.getElementById("avail-time");
    const selectedTime=time.options[time.selectedIndex];
    const patient_id=localStorage.getItem('patient_id');
    // console.log(selected.value,symptom,selectedTime.value);
    const info={
        appointment_type:selected.value,
        appointment_status:"Pending",
        time: selectedTime.value,
        symptom: symptom,
        cancel: false,
        patient: patient_id,
        doctor: params
    
    };
    console.log(info);
    fetch("https://testing-8az5.onrender.com/appointment/",{
        method : 'POST',
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(info),
    })
    .then((res) => res.json())
    .then((data)=>{
        window.location.href=`pdf.html?doctorId=${params}`
        // console.log(data);
    });    
};

const losdPatientId=()=>{
    const user_id=localStorage.getItem("userid");
    fetch(`https://testing-8az5.onrender.com/patient/list/?user_id${user_id}`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        localStorage.setItem("patient_id",data[0].id)
    })

};




losdPatientId();
getParams();

loadTime();