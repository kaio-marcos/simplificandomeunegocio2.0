
const numeros = ["1","2","3","4","5","6","7","8","9"]
const operadores_aritimeticos = ["+", "-", "x", "%"]

document.querySelectorAll("button").forEach(el => {
    el.addEventListener("click", calc, false)
})

function calc(e){
    el = e.target
    valor = el.dataset.value
    if(numeros.includes(valor)){
        let elemento = document.getElementById("input-valor")
        let valorAtual = elemento.value
        if(valorAtual == "0"){
            elemento.value = + valor
        }else{
            elemento.value = valorAtual + valor
        }
        
    }else if(operadores_aritimeticos.includes(valor)){
        let elemento = document.getElementById("monta-resultado")
        if(elemento.innerText == ""){
            elemento.innerText = document.getElementById("input-valor").value + valor
        }else{
            elemento.innerText = elemento.innerText + document.getElementById("input-valor").value + valor
        }
        document.getElementById("input-valor").value = "0"
    }else if(valor == "="){
        let resultado = document.getElementById("monta-resultado").innerText + document.getElementById("input-valor").value
        console.log(resultado)
        if(resultado != null){
            let numeros_para_calcular = []
            let valorAtual = ""

            for(i=0; i<resultado.length; i++){
                if(numeros.includes(resultado[i])){
                    valorAtual += resultado[i]
                    if(resultado[i+1] != null){
                        if(operadores_aritimeticos.includes(resultado[i+1])){
                            numeros_para_calcular.push(Number(valorAtual))
                            continue
                        }
                    }
                }else if(operadores_aritimeticos.includes(resultado[i])){
                    numeros_para_calcular.push(resultado[i])
                    valorAtual = ""
                }
                if(i + 1 == resultado.length){
                    numeros_para_calcular.push(Number(valorAtual))
                }
            }
            
            while(true){
                if(numeros_para_calcular.length >= 3){
                    let calculo_unico = numeros_para_calcular.splice(0,3)
                    let valor1 = calculo_unico[0]
                    let operador = calculo_unico[1]
                    let valor2 = calculo_unico[2]

                    if(operador == "+"){
                        resutado = valor1 + valor2
                        numeros_para_calcular.splice(0,0, resutado)
                    }
                }else{
                    break
                }
            }

            if(numeros_para_calcular.length == 1){
                document.getElementById("input-valor").value = numeros_para_calcular[0]
                document.getElementById("monta-resultado").innerText = ""
            }

        }
    }
}