import { RestVuex } from "@bit/wiznerd.horseman.rest-vuex";

export class HorsemanEmbeddables extends RestVuex {
  /**
   * A flag to use for debugging purpose. Set this to false to disable.
   */
  static _debug = false;

  /**
   * The API endpoint to use.
   */
  static endpoint = "embeddables";

  /**
   * An array of "included" relationships paths to pass to the JSON API which
   * tells it which relationships to load and include in the response.
   */
  static endpointInclude = [
    'content.calls_to_action.button_variant',
    'content.calls_to_action.frontend_route',
  ];


  /**
   * The label to use for storage events.
   */
  static storeName = "embeddables";
}