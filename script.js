function mandelbrot (real, imaginary, threshold) {
    var curReal = real;
    var curImag = imaginary;

    for (var i = 0; i < threshold; i++) {
        var tempReal = curReal * curReal - curImag * curImag + real;
        var tempImag = 2 * curReal * curImag + imaginary;

        if (tempReal * tempImag > 5) {
            return i / threshold * 100;
        }

        curReal = tempReal;
        curImag = tempImag;
    }

    return -1;
}

function plotMandelbrot (plotOptions, canvas) {
    var context = canvas.getContext('2d');

    var xBal = plotOptions.xBalance;
    var yBal = plotOptions.yBalance;
    var factor = plotOptions.factor;
    var threshold = plotOptions.threshold;

    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {
            var real = x / factor - xBal;
            var imaginary = y / factor - yBal;

            var howMuchEscaped = mandelbrot(real, imaginary, threshold);

            if (howMuchEscaped == -1) {
                context.fillStyle = '#000';
            } else {
                context.fillStyle = `hsl(180, 100%, ${howMuchEscaped}%)`
            }

            context.fillRect(x, y, 1, 1);
        }
    }
}

window.onload = function () {
    function get (id) {
        return document.getElementById(id) 
    };

    function getNumber(id) {
        return parseFloat(get(id).value);
    }

    var canvas = document.getElementById('my-canvas');

    get('bt-plot').onclick = function () {
        get('setup').style.display = 'none';
        canvas.style.display = 'block'

        canvas.width = window.innerWidth * 0.97;
        canvas.height = window.innerHeight * 0.97;

        plotMandelbrot({
            factor: getNumber('inp-factor'),
            xBalance: getNumber('inp-x-balance'),
            yBalance: getNumber('inp-y-balance'),
            threshold: getNumber('inp-threshold')
        }, canvas);
    };

    canvas.onclick = function () {
        get('setup').style.display = 'block';
        canvas.style.display = 'none'
    };
};
