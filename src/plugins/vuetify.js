import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles'
import colors from 'vuetify/util/colors' // 색깔을 임포트 해야한다.
import { mdi } from 'vuetify/iconsets/mdi'; 

export default createVuetify({
    // 뷰티파이에서 사용할 수 있는 UI 컴포넌트들을 의미한다.
    components,
    
    // 행동 요소들. 뷰티파이에서 html 요소에 행동을 부여하는 데 사용된다.
    directives,

    // prepend icon 설정
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
      }
    },
    theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primary: colors.green.darken1, // #4CAF5
              secondary: colors.green.lighten4, // #C8E6C
              deep: colors.green.darken4,
              sid_green: "#E6FFE3",
              sid_btn1: "#A4DEC6",
              sid_btn2: "094F08"
            }
          },
        },
      }
});