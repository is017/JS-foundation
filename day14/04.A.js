function A1(){
    a_common()
    console.log("A1")
}

function A2(){
    a_common()
    console.log("A2")
}

function a_common(){
    console.log("a_common")
}

export{
    A1,
    A2
}