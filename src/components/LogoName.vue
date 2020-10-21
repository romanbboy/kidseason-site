<template>
  <div class="logo">
    <img src="../assets/img/logo.png" alt="">
    
    <div class="logo-name">
      <span class="an an_k">K</span>
      <span class="an an_i">i</span>
      <span class="an an_d">d</span>
      <span class="an an_s1">S</span>
      <span class="an an_e">e</span>
      <span class="an an_a">a</span>
      <span class="an an_s2">s</span>
      <span class="an an_o">o</span>
      <span class="an an_n">n</span>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  
@keyframes appear-move-rotate {
  0%{
    transform: translateX(-40px) rotate(0deg);
  }
  100%{
    opacity: 1;
    transform: translateX(0) rotate(360deg);
  }
}

@keyframes appear {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

@keyframes push_1 {
  0%{
    transform: translateX(0);
  }
  20%{
    transform: translateX(-3px);
  }
  30%{
    transform: translateX(4px);
  }
}

@keyframes down {
  0%{
    transform: translateY(0);
  }
  25%{
    transform: translateY(4px);
  }
  50%{
    transform: translateY(0);
  }
  75%{
    transform: translateY(-4px);
  }
  100%{
    transform: translateY(0);
  }
}

@keyframes back_1 {
  0%{
    transform: translateX(0);
  }
  30%{
    transform: translateX(0px) rotate(0deg);
  }
  40%{
    transform: translate(10px, 4px) rotate(90deg);
  }
  60%{
    transform: translate(10px, 4px) rotate(90deg);
  }
  100%{
    transform: translate(0, 0) rotate(-360deg);
  }
}

@keyframes touch {
  0%{
    transform: rotate(0);
  }
  30%{
    transform: rotate(40deg);
  }
}
  
.logo{
  display: flex;
  align-items: center;

  img{
    width: 100px;
    margin-right: 20px;
    opacity: 0;
    animation: appear-move-rotate 2s forwards;
  }
  
  .logo-name{
    font-family: 'Kosko';
    font-size: 34px;
    .an{
      opacity: 0;
      animation: appear .7s forwards;
      display: inline-block;

      &_{
        &k{
          color: #EC4D77;
          animation-delay: 2s;
        }
        &i{
          color: #9D649D;
          animation-delay: 2.1s;
        }
        &d{
          color: #DB6814;
          animation-delay: 2.2s;
        }
        &s1{
          color: #FEFE00;
          animation-delay: 2.3s;
        }
        &e{
          color: #F4809A;
          animation-delay: 2.4s;
        }
        &a{
          color: #46A4B5;
          animation-delay: 2.5s;
        }
        &s2{
          color: #F37D4A;
          animation: appear .7s forwards 2.6s, touch .8s forwards 5.2s;
        }
        &o{
          color: #44A4B5;
          animation: appear .7s forwards 2.7s, push_1 2s forwards 3.2s, down 1s linear 3 5.2s;
        }
        &n{
          color: #EC4D77;
          animation: appear .7s forwards 2.8s, back_1 2s forwards 3.2s;
        }
      }

    }
  }
}
</style>