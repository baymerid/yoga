window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideContent (a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideContent(1);

    function showContent (b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
        
    }
    
    info.addEventListener('click', (event)=> {
        if (event.target && event.target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (event.target == tab[i]) {
                    hideContent(0);
                    showContent(i);
                }
            }        
        }
    });

    // TIMER

    let deadline = '2022-02-20';

    function getTimeRemaining (endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60/60));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds,
        };  
    }

    function setClock(id, endtime) {
        let 
            timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);   
            
            function addZero(num){
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            };

                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);
     

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';    
                seconds.textContent = '00';  
            };
        };
    };

    setClock('timer', deadline);

    // MODAL

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        description = document.querySelectorAll('.description-btn');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    description.forEach((element, index) => {
        description[index].addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });


    // FORM

    let message = {
        loading: "Загрузка...",
        success: "Спасибо, скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так..."
    };

    let form = document.getElementsByClassName('main-form')[0];
    // let formBottom = getElementById('form');
    let input = form.getElementsByTagName('input');
    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
                e.appendChild(statusMessage);
                let formData = new FormData (elem);
            
                function postData(data) {
                    return new Promise(function (resolve, reject) {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
                    
                        request.onreadystatechange = function() {
                            if (request.readyState < 4) {
                                resolve();
                            } else if (request.readyState === 4) {
                                if (request.status == 200 && request.status < 300) {
                                    resolve();
                                } else {
                                reject();
                                }
                            }
                        }
                        request.send(data);
                    });
                } // End postData
    
            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData)
                .then(()=> statusMessage.innerHTML = message.loading)
                .then(()=>{
                    thanksModal.style.display = 'block';
                    mainModal.style.display = 'none';
                    statusMessage.innerHTML = '';
                })
                .catch(()=> statusMessage.innerHTML = message.failure)
                .then(clearInput)
                
        });        
    }
    sendForm(form);
    // sendForm(formBottom);    

    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item)=> item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    prev.onclick = () => {
        showSlides(slideIndex += -1);
    }

    next.onclick = () => {
        showSlides(slideIndex += 1);
    }

    dotsWrap.onclick = (event) => {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                showSlides(slideIndex = i);
            }
        }
    }

    // CALCULATOR

    let peopleQuantity = document.querySelectorAll('.counter-block-input')[0],
        dayQuantity = document.querySelectorAll('.counter-block-input')[1],
        placeSelect = document.querySelector('#select'),
        sum = document.querySelector('#total');
    
    sum.innerHTML = 0;

    peopleQuantity.addEventListener('input', (e)=> {
        sum.innerHTML = ((peopleQuantity.value * dayQuantity.value) * 4000) * placeSelect.options[placeSelect.selectedIndex].value;
    })

    dayQuantity.addEventListener('input', (e)=> {
        sum.innerHTML = ((peopleQuantity.value * dayQuantity.value) * 4000) * placeSelect.options[placeSelect.selectedIndex].value;
    })
        
    placeSelect.addEventListener('change', () => {
        if (peopleQuantity.value == '' || dayQuantity.value == '') {
            sum.innerHTML = 0;
        } else {
            sum.innerHTML = ((peopleQuantity.value * dayQuantity.value) * 4000) * placeSelect.options[placeSelect.selectedIndex].value;
        }
    })    
});