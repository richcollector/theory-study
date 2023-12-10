## export default와 export

- default는 지정한 하나만 export가 가능합니다. export된 것은 import qqq from ‘’와 같이 이름을 마음대로 변경하여 사용할 수 있습니다.

- export는 여러개를 지정하여 export가 가능합니다. export가 된 것은 import {zzz, sss, ddd} from ‘’와 같이 불러올 수 있고, import \* as s from ‘’ s.ddd처럼 하 번에 불러와서 사용할 수 있지만, 이름을 default처럼 바꿀 수는 없습니다.
