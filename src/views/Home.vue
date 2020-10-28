<template>
  <div id="HomePage">
    <div class="owner-info">
      <AvatarBlock />

      <div class="info">
        <p class="bigtext">Мороз Лариса Яковлевна</p>
        <p>Супер кошечка))</p>
        <p><b>Должность:</b> мама троих высоких детей</p>
        <p><b>Стаж:</b> 28 лет</p>
        <p>49 лет, выглядит на <b>24</b> года</p>
      </div>
    </div>

    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium alias animi at consequatur cum dolorem dolores error eum explicabo harum ipsum itaque laboriosam laudantium nemo, nesciunt nobis nulla perferendis perspiciatis, possimus quas quia quibusdam quis quo ratione repellat sapiente sed sint, soluta voluptatum. Aut ipsum minus, officiis quam quo repellat sapiente sed vel voluptatum! Architecto delectus deserunt fugiat ipsum maxime minus modi nam, non saepe ullam, vel, veniam. Iusto laborum necessitatibus nisi quisquam tempore voluptas voluptatibus. Autem dignissimos dolore eos inventore odit optio pariatur quaerat tempore! Accusamus corporis cupiditate dolores explicabo, illum ipsa modi molestiae molestias mollitia, neque officia quas quos sed tenetur voluptas! Asperiores assumenda libero numquam quam sint. A ad alias aliquid animi aspernatur consectetur cum doloribus eligendi enim eos et excepturi facilis fugiat in ipsum iste, itaque iusto laboriosam laborum libero modi nisi placeat qui quibusdam quidem quod reiciendis saepe sapiente, sunt ullam! Doloribus iusto, necessitatibus. Alias distinctio dolor dolorum earum, fugiat hic ipsa ipsam magnam necessitatibus, nobis odit pariatur sunt vitae voluptatem voluptates. Accusantium dolorum esse et, iusto odit pariatur quo. Accusamus aut blanditiis deleniti dolore, eligendi est impedit minus nemo nihil, obcaecati optio quae quibusdam quis quo tempora unde, ut velit! Animi assumenda blanditiis deserunt dignissimos dolores doloribus eligendi ex, ipsum iste maxime neque nisi odio repellendus rerum similique soluta tempore! Accusantium aliquam at atque, autem consequatur cum cumque doloribus ducimus id, illum, maxime minus molestias nihil nulla optio pariatur perspiciatis quasi qui quos sapiente vel veritatis voluptates! Ab accusamus aliquid amet animi aperiam, corporis cum cumque delectus deleniti dignissimos dolores eos et excepturi explicabo illum itaque libero maxime, molestias nam natus nihil nisi nobis obcaecati officia omnis provident quis quisquam ratione reiciendis reprehenderit sint unde ut voluptatibus? Earum enim fugiat ipsum iusto laborum minima minus numquam, obcaecati omnis perspiciatis possimus provident quae sequi temporibus ullam vitae, voluptatibus. Beatae doloremque ex minima mollitia numquam velit voluptatem. Amet consequatur delectus eius ex provident? Minima modi nam qui rem repudiandae! Aliquid aspernatur blanditiis cumque dolorem, hic incidunt ipsum libero nostrum quas, quibusdam quos similique! Culpa delectus molestiae nisi tenetur vel. Accusantium asperiores at atque, aut consectetur corporis cum cumque deleniti dolorem dolorum earum enim eos est eveniet facere ipsa, ipsam iusto magni nam, natus nesciunt nisi odit omnis possimus provident quam quis ratione soluta ullam voluptas! Alias aliquid architecto aspernatur aut beatae culpa dignissimos, doloremque dolorum ea error est et ex exercitationem expedita facilis fuga fugiat illo inventore labore libero modi nam nisi, obcaecati pariatur quisquam quos ratione rerum, sapiente sed soluta tenetur totam ullam voluptatum. Assumenda atque beatae, consequatur dolore in ipsa labore necessitatibus non possimus tenetur? Ad aliquam architecto commodi cupiditate dolor enim excepturi expedita facere fugiat hic maiores, natus neque nihil obcaecati officia quas quasi sequi soluta, suscipit tempore. Asperiores at aut, deserunt distinctio esse, incidunt laboriosam nisi obcaecati omnis quia recusandae rem totam ut. Accusantium cumque sapiente velit voluptatem. Aliquam delectus eaque laboriosam modi nam. Accusantium atque beatae corporis dignissimos error est expedita itaque minus, officia perspiciatis praesentium quae quisquam rem soluta.
    </div>
  </div>
</template>

<script>

import AvatarBlock from "../components/AvatarBlock";

export default {
  name: 'Home',
  components: {
    AvatarBlock
  },
  created() {
    this.$store.dispatch('showAside', false)
  }
}
</script>

<style lang="scss" scoped>
  .owner-info{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 40px;

    .info{
      clip-path: polygon(0% 100%, 0% 100%, 0% 0%, 0% 0%);
      margin-left: 70px;
      animation: appear-polygon 1s forwards 1.2s;

      p{
        text-align: center;

        &.bigtext{
          font-family: 'Kosko';
          font-size: 26px;
        }
      }
    }
  }
</style>
