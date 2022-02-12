function main(width, height) {
    var canvas = document.getElementById('canvas');
    var width = canvas.getAttribute('width');
    var height = canvas.getAttribute('height');
    console.log(width,height)
    console.log(width===200, height===200)
    var ctx = canvas.getContext("2d");
    console.log(ctx)
    ctx.fillStyle = '#FF00FF';
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = '#00FF00'
    ctx.fillRect(850,350,900,400)

  }
  main()