import { RestVuex } from "@bit/wiznerd.horseman.rest-vuex";

export class HorsemanRecipes extends RestVuex {
  /**
   * A flag to use for debugging purpose. Set this to false to disable.
   */
  static _debug = false;

  /**
   * The API endpoint to use.
   */
  static endpoint = "recipes";

  /**
   * An array of "included" relationships paths to pass to the JSON API which
   * tells it which relationships to load and include in the response.
   */
  static endpointInclude = [
    'category',
    'image.imageFile',
    'tags',
  ];


  /**
   * The label to use for storage events.
   */
  static storeName = "recipes";
}