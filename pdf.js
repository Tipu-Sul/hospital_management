const handlePDF=()=>{
    const doc_id= new URLSearchParams(window.location.search).get("doctorId");
    console.log(doc_id);
    const user_id=localStorage.getItem("user_id");

    fetch(`https://testing-8az5.onrender.com/doctor/list/${doc_id}`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
        .then((res)=> res.json())
        .then((pddata)=>{
            const newdata=[data, pddata];
            console.log(newdata);
            const parent=document.getElementById("pdf-container");
            const div=document.createElement("div");
            div.innerHTML=`
            <div class="d-flex flex-wrap justify-content-around gap-3">

            <div class="patient">
            <h1>Patient</h1>
                <h3>Name :${newdata[1].username} </h3>
                <h2>Email :${newdata[1].email}</h2>
                <h2>Phone :${newdata[1].id} </h2>
            </div>
            <div class="doctor">
            <h1>Doctor</h1>
                <h3>Name:${newdata[0].full_name}</h3>
                <h3>Designation :${newdata[0].specialization.map((item)=>{
                    return `<li>${item}</li>`
                } )} </h3>
                <h3>Specialization :${newdata[0].designation.map((item)=>{
                    return `<li>${item}</li>`
                })}</h3>
            </div>
    
            </div>
            <input class="symtom mt-5" type="text">
            <br>
            <h3 class="text-center mt-5">Fees::${newdata[0].fee }</h3>
            `;
            parent.appendChild(div);
            downloadPDF(); 
        }) ;  
    });

}

const downloadPDF=()=>{
    const element = document.getElementById("pdf-container");

    const option={
       margin: 10,
       filename:'New_PDF.pdf',
       image : {type:"jpeg",quality: 0.98},
       html2canvas: {scale: 2},
       jsPDF:{unit:"mm",format:"a4",orientation :"portrait"},
    };
    // Add the image to the PDF
    html2pdf(element, option);
};

handlePDF();

