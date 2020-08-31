let mainController = ( (uiCtrl) => {
    //Dom strings here
    let DomStrings = {
        nextBtn: '.nxt-btn',
        previousBtn: '.pre-btn',
        close: '.close-btn',
        img: '.img',
        container: '.container',
        main: '.mainImg',
        overlay: '.overlay',
        number: '.counter',
        gal:'.gallery'
    };
    let galIndex = {
        index: 0,
        max: 0,
        imageSrc: []
    };

    //show or hide a overlay div on click
    let btnSwitch = () =>{
        document.querySelector(DomStrings.overlay).classList.toggle('show');
    };

    //set a clicked image on DOM 
    let showImg = (el, node) => {
        let source = el.target.attributes.src.nodeValue;
      
        document.querySelector(DomStrings.main).setAttribute("src", `${source}`);
        btnSwitch();
        let index = setIndex(source);
      
        galIndex.index = index;
      
        updateCount();
    };
    let updateCount = () => {
        document.querySelector(DomStrings.number).textContent = `${galIndex.index + 1}/${galIndex.max}`;
    }
    //finding index of clicked image
    let setIndex = (el) => {
       
        let list = galIndex.imageSrc;
        galIndex.max = list.length;
        let num = 0;
        list.forEach((item, index) => {
            if(item === el){
                num = index;
            }
        });
        return num;
    };

    //functionality for previous button
    let previousImg = () => {
        galIndex.index -= 1;
        if(galIndex.index >= 0){
            
            document.querySelector(DomStrings.main).setAttribute("src", `${galIndex.imageSrc[galIndex.index]}`); 
            updateCount();
        }
        else{
            galIndex.index = galIndex.max - 1;
            document.querySelector(DomStrings.main).setAttribute("src", `${galIndex.imageSrc[galIndex.index]}`);
            updateCount();
        }
    };

    //functionality for next button
    let nextImg = () => {
        galIndex.index += 1;
        if(galIndex.index <= galIndex.max - 1){
            
            document.querySelector(DomStrings.main).setAttribute("src", `${galIndex.imageSrc[galIndex.index]}`); 
            updateCount();
        }
        else{
            galIndex.index = 0;
            document.querySelector(DomStrings.main).setAttribute("src", `${galIndex.imageSrc[galIndex.index]}`);
            updateCount();
        }
    };

    //adding events and getting src attribute of all images from DOM
    let eventHandler = () => {
        document.querySelector(DomStrings.previousBtn).addEventListener('click', previousImg);
        document.querySelector(DomStrings.nextBtn).addEventListener('click', nextImg);
        document.querySelector(DomStrings.close).addEventListener('click', btnSwitch);
        document.querySelector(DomStrings.gal).addEventListener('click', showImg);
        let nodeList = document.querySelectorAll(DomStrings.img);
        let list = [];
        nodeList.forEach((item, index) => {
           
            list.push(document.getElementsByTagName("img")[index].getAttribute("src")) ; 
            
        });
        
        galIndex.imageSrc = list;
       
    };

    return{
        //initilizing main function
        init: () => {
            eventHandler();
        }
    };
})();
//envoking main function
mainController.init();