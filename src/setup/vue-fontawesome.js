import Vue from "vue";

// Provide a Font Awesmoe Icon component to everyone!
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Use the library feature to only bundle the icons we use.
import { library } from "@fortawesome/fontawesome-svg-core";

// Light icons (fal).
import {
  faCheck as falCheck,
  faCheckCircle as falCheckCircle,
  faChevronDown as falChevronDown,
  faChevronLeft as falChevronLeft,
  faChevronRight as falChevronRight,
  faPlus as falPlus,
  faPlusCircle as falPlusCircle,
  faQuestionCircle as falQuestionCircle,
  faTimes as falTimes,
  faTimesCircle as falTimesCircle
} from "@fortawesome/pro-light-svg-icons";

library.add(
  falCheck,
  falCheckCircle,
  falChevronDown,
  falChevronLeft,
  falChevronRight,
  falPlus,
  falPlusCircle,
  falQuestionCircle,
  falTimes,
  falTimesCircle
);

// Regular icons (far).
import { faSave as farSave } from "@fortawesome/pro-regular-svg-icons";

library.add(farSave);

// Solid icons (fas).
import {
  faAngleDoubleLeft as fasAngleDoubleLeft,
  faAngleDoubleRight as fasAngleDoubleRight,
  faAngleLeft as fasAngleLeft,
  faAngleRight as fasAngleRight,
  faBars as fasBars,
  faCheck as fasCheck,
  faCheckCircle as fasCheckCircle,
  faChevronDown as fasChevronDown,
  faChevronLeft as fasChevronLeft,
  faChevronRight as fasChevronRight,
  faCircle as fasCircle,
  faEllipsisH as fasEllipsisH,
  faEllipsisV as fasEllipsisV,
  faExclamation as fasExclamation,
  faExclamationCircle as fasExclamationCircle,
  faGripVertical as fasGripVertical,
  faInfoCircle as fasInfoCircle,
  faPen as fasPen,
  faPlus as fasPlus,
  faPlusCircle as fasPlusCircle,
  faSearch as fasSearch,
  faSort as fasSort,
  faSortDown as fasSortDown,
  faSortUp as fasSortUp,
  faSyncAlt as fasSyncAlt,
  faTag as fasTag
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fasAngleDoubleLeft,
  fasAngleDoubleRight,
  fasAngleLeft,
  fasAngleRight,
  fasBars,
  fasCheck,
  fasCheckCircle,
  fasChevronDown,
  fasChevronLeft,
  fasChevronRight,
  fasCircle,
  fasEllipsisH,
  fasEllipsisV,
  fasExclamation,
  fasExclamationCircle,
  fasGripVertical,
  fasInfoCircle,
  fasPen,
  fasPlus,
  fasPlusCircle,
  fasSearch,
  fasSort,
  fasSortDown,
  fasSortUp,
  fasSyncAlt,
  fasTag
);

import {
  faCommentAltLines as fasCommentAltLines,
  faLocation as fasLocation
} from "@fortawesome/pro-solid-svg-icons";

library.add(
  fasCommentAltLines,
  fasLocation
);

// Brand icons (fab).
import {
  faFacebook as fabFacebook,
  faLinkedin as fabLinkedin,
  faTwitter as fabTwitter
} from "@fortawesome/free-brands-svg-icons";

library.add(fabFacebook, fabLinkedin, fabTwitter);