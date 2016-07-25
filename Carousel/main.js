/**
 * Created by Mecho on 23/07/2016.
 */
'use strict';
(function () {
    
    var navList = document.getElementsByTagName('ul')[0];
    var handle = document.getElementsByClassName('handle')[0];
    var imgs = Array.from(document.getElementsByTagName('img'));
    var arrowLeft = document.getElementsByClassName('arrow-left')[0];
    arrowLeft.style.visibility = 'hidden';
    var arrowRight = document.getElementsByClassName('arrow-right')[0];
    var numberOfImages = 5;
    var currentImage = 1;
    var slideInterval = 5000;
    var winWidth = window.innerWidth;
    var outerCircles =  Array.from(document.getElementsByClassName('outer-circle'));
   /* var circles =  Array.from(document.getElementsByClassName('inner-circle'));
    circles[0].style.visibility = 'visible';*/
    var circles =  Array.from(document.getElementsByClassName('inner-circle'));
    circles[0].style.visibility = 'visible';

    handle.addEventListener('click', function () {
        navList.classList.toggle('showing');
    }, false);

    var moveImgsLeft = function () {
        if(!imgs) {
            return;
        }
        console.warn('moving LEFT');
        if (currentImage == numberOfImages) {
            return;
        }


        imgs.forEach(function (el) {

          /*  var pos = 0;
            var id = setInterval(frame, 5);
            function frame() {
                if (pos == el.width) {
                    clearInterval(id);
                } else {
                    pos++;

                    el.style.left = '-' + ((el.width*currentImage-1) + pos) + 'px';
                }
            }
            */
         el.style.left= '-' + (el.width*currentImage) + 'px';

          /*  el.style.transform = 'translate(-' + (el.width) + 'px, 0px)';
            console.log('Left position: ' + el.style.left);*/
        });
        if (currentImage <= 4) {
            currentImage++;
        }
        console.log('Current image: ' + currentImage);
        circles.forEach(function (circle) {
            circle.style.visibility = 'hidden';
        });
        circles[currentImage-1].style.visibility = 'visible';
        if(currentImage == 1) {
            arrowLeft.style.visibility = 'hidden';
        } else if (currentImage == numberOfImages) {
            arrowRight.style.visibility = 'hidden';
            arrowLeft.style.visibility = 'visible';
        } else {
            arrowLeft.style.visibility = 'visible';
            arrowRight.style.visibility = 'visible';
        }
    };

    var moveImgsRight = function () {
        if(!imgs) {
            return;
        }
        if (imgs[0].style.left.indexOf('-') == 0) {
            currentImage--;
        } else {
            return;
        }

        circles.forEach(function (circle) {
            circle.style.visibility = 'hidden';
        });
        circles[currentImage-1].style.visibility = 'visible';

        imgs.forEach(function (el) {
            el.style.left= '-' + (el.width*(currentImage-1)) + 'px';
            console.log(el.style.left);

        });
        console.log('Current image: ' + currentImage);
        console.warn('moving RIGHT');
        if(currentImage == 1) {
            arrowLeft.style.visibility = 'hidden';
        } else if (currentImage == numberOfImages) {
            arrowRight.style.visibility = 'hidden';
            arrowLeft.style.visibility = 'visible';
        } else {
            arrowLeft.style.visibility = 'visible';
            arrowRight.style.visibility = 'visible';
        }
    };

    arrowLeft.addEventListener('click', moveImgsRight, false);
    arrowRight.addEventListener('click', moveImgsLeft, false);

    var canMoveLeft = true;
    var currentAction = moveImgsLeft;
    setInterval(function () {
        if(canMoveLeft) {
            moveImgsLeft();
            if(currentImage == numberOfImages) {
                canMoveLeft = false;

                currentAction = moveImgsRight;
            }
        } else {
            moveImgsRight();
            if (currentImage == 1) {
                canMoveLeft = true;
                currentAction = moveImgsLeft;
            }
        }

        if(currentImage == 1) {
            arrowLeft.style.visibility = 'hidden';
        } else if (currentImage == numberOfImages) {
            arrowRight.style.visibility = 'hidden';
            arrowLeft.style.visibility = 'visible';
        } else {
            arrowLeft.style.visibility = 'visible';
            arrowRight.style.visibility = 'visible';
        }

    }, slideInterval);

   window.addEventListener('resize', function () {
       imgs.forEach(function (el) {
           el.style.left= '-' + (el.width*currentImage) + 'px';
       });
        console.log('Current action called after window resize!');
    }, false);

    for(var i = 0; i<outerCircles.length; i++) {
        outerCircles[i].addEventListener('click', function (i) {
                  var element = this;
            return function () {
                console.log('current image from circle: ' + currentImage);
                imgs.forEach(function (el) {
                    currentImage = i+1;
                    /*  var pos = 0;
                     var id = setInterval(frame, 5);
                     function frame() {
                     if (pos == el.width) {
                     clearInterval(id);
                     } else {
                     pos++;

                     el.style.left = '-' + ((el.width*currentImage-1) + pos) + 'px';
                     }
                     }
                     */
                    el.style.left= '-' + (el.width*i) + 'px';
                    console.log(el.style.left);
                    /*  el.style.transform = 'translate(-' + (el.width) + 'px, 0px)';
                     console.log('Left position: ' + el.style.left);*/
                    circles.forEach(function (circle) {
                        circle.style.visibility = 'hidden';
                    });
                    circles[currentImage-1].style.visibility = 'visible';
                    if(currentImage == 1) {
                        arrowLeft.style.visibility = 'hidden';
                    } else if (currentImage == numberOfImages) {
                        arrowRight.style.visibility = 'hidden';
                        arrowLeft.style.visibility = 'visible';
                    } else {
                        arrowLeft.style.visibility = 'visible';
                        arrowRight.style.visibility = 'visible';
                    }
                });
            }
        }(i), false);
    }






})(window);
