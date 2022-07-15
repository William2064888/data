//trazas en el código
console.log("Inicio de script")

//Prueba para cargar fichero
d3.csv("https://raw.githubusercontent.com/William2064888/DataFinal/main/datos_examen.csv").then (function (datos){
    console.log ("Fichero cargado")

    
    //dimensiones de la gráfica
    var height = 500 //Alto
    var width = 600//Ancho
    
    //márgenes
    var margin = {
        top: 100,    
        botton: 200,
        left: 100,
        right: 50     
    }
    
       
    //Configuracion del eje y ranking del alumno
    var escalaY = d3.scaleLinear()
        .domain (["0","11"])
        .range ([300,0])

    
    //Configuracion del eje x representa la nota del alumno
    var escalaX = d3.scaleLinear()
        .domain(["0.00","10.00"])
        .range ([100,450])

    
    //Asigna el color a la escala que dibuja el estrato de 1 a 6
    var escalaColor = d3.scaleLinear()
        .domain (["1","9"])
        .range (["red", "blue"])
    

    // Asigna el tamaño de los 9
    var escalatamanio = d3.scaleLinear ()
        .domain (["0","20"])
        .range ([10,30])
    
    //Configuracion del estilo del contenido del body
    var elementoSVG = d3.select ("body")
        .append ("svg")
        .attr ("width", width)
        .attr ("height", height)
        .attr("font-size", "16")  
        .attr("font-family", "Georgia")
        .attr("font-weight", "bold")
    
    //Configuracion de los circulos, escala e informacion que representan
    elementoSVG
            .selectAll ("circle")
            .data(datos)
            .enter()
            .append ("circle")
            .attr ("r", d =>escalatamanio(+d.elementos_y))
            .attr("cx",d => escalaX(+d.ranking))
            .attr("cy", d=> escalaY(+d.nota))
            .attr("fill", d => escalaColor(+d.alumno))
    
            //Se configura el tooltiptext que identifica la informacion detallada de cada circulo
    
            .join("rect")
            .append('title')
            .text((d) => `Estrato ${d3.format(".1f")(d.alumno)}
Notas Alumnos{d3.format(".1f")(d.nota)} 
Ranking Alumno{d3.format(".1f")(d.ranking)}`);
   
    
    // Tamaño de los simbolos de etiquetas
    var size = 20
    
     // crea lista de etiquetas
    var keys = [""]
 
    // Visualizacion del eje Y
    var ejeY = d3.axisLeft (escalaY)
    
    // Estilo y Configuracion del eje y
    elementoSVG
        .append("g")
        .attr ("transform", "translate (" + margin.left + ",0)")
        .call (ejeY)
        .call(g=>g.append("text")
              .attr("text-anchor", "middle")
              .attr("x", -150)
              .attr("y", -35)
              .attr("transform", "rotate(-90)")
              .attr("fill", "currentColor")
              .text("Ranking Alumno")
              .attr("font-size", "14")  
              .attr("font-family", "Georgia")
              .attr("font-weight", "bold")
             )
    
    /// Visualizacion del eje X
    var ejeX = d3.axisBottom (escalaX)
    // PONER TICKS
        .ticks (5)
        .tickFormat (d3.format(".3s"))
    
    // Estilo y Configuracion del eje X
    elementoSVG
        .append("g")
        .attr ("transform", "translate (0," + (height - margin.botton) + ")")
        .call (ejeX)
        .call(g => g.append("text")
            .attr("x", 280)
            .attr("y", 35)
            .attr("fill", "currentColor")
            .text("Nota Alumno")
            .attr("font-size", "14")
            .attr("font-family", "Georgia")
            .attr("font-weight", "bold"))
    
    //Estilo y configuracion de las convenciones del ranking por estudiante
         .call(g => g
            .selectAll("mydots")
            .data(datos)
            .enter()
            .append("rect")
            .attr("x", function(d,i){ return 80 + i*(size+58)}) // 100 is where the first dot appears. 75 is the distance between dots
            .attr("y", 45)
            .attr("width", size)
            .attr("height", size)
            .attr("fill", d => escalaColor(+d.cod_estrato)))
    
        .call(g => g
            .selectAll("mylabels")
            .data(keys)
            .enter()
            .append("text")
            .attr("x", function(d,i){ return 115 + i*(size+58)}) // 100 is where the first dot appears. 75 is the distance between dots
            .attr("y", 50)
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .attr("fill", "currentColor")
            .style("alignment-baseline", "middle")
            .attr("font-size", "10")
            .attr("font-family", "Georgia")
            .attr("font-weight", "bold"))


})


