import Vue from "vue";
import axios from "axios";

export class RestVuex {
  /**
   * Initialize a RestVuex object.
   * 
   * @param {Vuex} store The active Vuex store object to attach our module to.
   * @param {String} baseUrl The base URL of our API resource.
   * @param {Boolean} [preLoad] Set to TRUE to asynchronously request this
   *   collection immediately after bootstrapping.
   */
  constructor({ store, consumerId, baseUrl, preLoad = false }) {
    this._baseUrl = baseUrl;
    this._consumerId = consumerId ? consumerId : undefined;

    // Initialize our vuex module.
    this._module = {
      namespaced: true,
      state: this.constructor._initModuleState(),
      getters: {},
      actions: {},
      mutations: {}
    };

    // Detect vuex getters, actions, and mutations.
    const vuexConfig = this.constructor._vuexConfig();
    Object.keys(vuexConfig.vuexGetter).forEach(name => {
      this._module.getters[name] = (state, getters, rootState, rootGetters) => {
        return vuexConfig.vuexGetter[name].call(
          this,
          state,
          getters,
          rootState,
          rootGetters
        );
      };
    });

    // Wrap actions and mutations so we can set this object as the context in
    // which they run, instead of the Store.
    Object.keys(vuexConfig.vuexAction).forEach(name => {
      this._module.actions[name] = (context, payload) => {
        return vuexConfig.vuexAction[name].call(this, context, payload);
      };
    });

    Object.keys(vuexConfig.vuexMutation).forEach(name => {
      this._module.mutations[name] = (state, payload) => {
        vuexConfig.vuexMutation[name].call(this, state, payload);
      };
    });

    // Allow subclasses to alter our module, then register it with Vuex.
    this._alterModule(this._module);
    if (this.constructor._debug) {
      console.debug(
        `Registering Vuex module for %c${this.constructor.name}`,
        "color: blue; font-weight: bold;",
        this._module
      );
    }
    store.registerModule(this.constructor.storeName, this._module);

    // Create an axios instance.
    this._axios = this._initAxios();
    this._axios.interceptors.request.use(request => {
      return this.constructor._preprocessRequest.call(this, request);
    });
    this._axios.interceptors.response.use(response => {
      return this.constructor._preprocessResponse.call(this, response);
    });

    // Start asynchronously loading our collection resources immediately after
    // Vuex is bootstrapped.
    if (preLoad) {
      Vue.nextTick(() => {
        store.dispatch(`${this.constructor.storeName}/getCollection`);
      });
    }

    this.constructor._interfaceSimulation();
  }

  /**
   * A usable Vuex module, generated from this class.
   */
  _module;

  /**
   * An Axios instance for this specific backend.
   */
  _axios;

  /**
   * The Consumer ID to use, if any.
   */
  _consumerId;

  /**
   * The base URL of the REST server.
   */
  _baseUrl;

  /**
   * Initialize Axios instance.
   */
  _initAxios() {
    return axios.create({
      baseURL: this._baseUrl
    });
  }

  /**
   * Alter the Vuex module before registration.
   */
  _alterModule() { }

  /**
   * A flag to use for debugging purpose. Set this to false to disable.
   */
  static _debug = false;

  /**
   * The API endpoint to use.
   */
  static endpoint = "examples";

  /**
   * An array of "included" relationships paths to pass to the JSON API which
   * tells it which relationships to load and include in the response.
   */
  static endpointInclude = [
    'image.imageFile'
  ];

  /**
   * The name of your store/Vuex module. Subclasses must override this.
   */
  static storeName = "httpRequests";

  /**
   * An array of required properties for subclasses to implement.
   */
  static _requiredProps() {
    return ["endpoint", "storeName"];
  }

  /**
   * Initialize Vuex module state.
   */
  static _initModuleState() {
    return {
      isLoading: false,
      records: {}
    };
  }

  /**
   * Vuex getter for gettings all records.
   */
  static vuexGetterAll(state) {
    return state.records;
  }

  /**
   * Vuex getter for finding a record by gid.
   */
  static vuexGetterFind(state) {
    return id => state.records[id];
  }

  /**
   * Vuex getter for our current loading status.
   */
  static vuexGetterIsLoading(state) {
    return state.isLoading;
  }

  /**
   * Vuex action for fetching a resource collection via GET.
   */
  static async vuexActionGetCollection({ getters, commit }) {
    await commit("setLoading", true);
    const params = {};
    if (this.constructor.endpointInclude.length) {
      params.include = this.constructor.endpointInclude.join(",");
    }
    if (this._consumerId) {
      params.consumerId = this._consumerId;
    }
    const response = await this._axios.get(this.constructor.endpoint, { params });
    await commit("saveAll", this.constructor._parseCollection(response));
    await commit("setLoading", false);
    return getters.all;
  }

  /**
   * Vuex save mutation.
   */
  static vuexMutationSave(state, payload) {
    Vue.set(state.records, payload.key, payload.value);
  }

  /**
   * Vuex save all mutation.
   */
  static vuexMutationSaveAll(state, payload) {
    for (const id in payload) {
      Vue.set(state.records, id, payload[id]);
    }
  }

  /**
   * Vuex loading state mutation.
   */
  static vuexMutationSetLoading(state, status) {
    Vue.set(state, "isLoading", Boolean(status));
  }

  /**
   * Turn a response object into a Vuex record.
   */
  static _parseRecord(result) {
    // Don't do anything fancy, just return the simplified internal record
    // object prased out in _fillRelationships. Subclassess can override this
    // if they need to do something special.
    return result._record;
  }

  /**
   * Parse a collection response from the API into individual Vuex records.
   */
  static _parseCollection(response) {
    // Fill out entity relationship references.
    this._fillRelationships(response);

    // Read out each record and attach its image information.
    const records = {};
    response.data.data.forEach(data => {
      records[data.id] = this._parseRecord(data);
    });
    return records;
  }

  /**
   * Parse out response relationships from an API response.
   */
  static _fillRelationships(response) {
    // First, get a full list of included entities.
    const entities = {};

    // Read in first-level results.
    response.data.data.forEach(result => {
      entities[result.id] = result;
    });

    // Read in included relationship entities, if any.
    if (response.data.included) {
      response.data.included.forEach(result => {
        entities[result.id] = result;
      });
    }

    // Now make a simpler list that consolidates just the data we care about.
    const simplified = {};
    for (const uuid in entities) {
      const entity = entities[uuid];
      simplified[uuid] = { ...entity.attributes, ...{ uuid: entity.id }, ...{ links: entity.links } };
    }

    // Now go through again and replace relationship uuids with references to
    // actual simplified entity objects.
    for (const uuid in entities) {
      const entity = entities[uuid];
      if (entity.relationships) {
        for (const relationType in entity.relationships) {
          const relations = entity.relationships[relationType].data;
          // Handle multi-value relationships.
          if (Array.isArray(relations)) {
            simplified[uuid][relationType] = [];
            relations.forEach(relation => {
              simplified[uuid][relationType].push(simplified[relation.id] ? simplified[relation.id] : relation.id);
            });
          }
          // Handle single-value relationships.
          else if (relations) {
            simplified[uuid][relationType] = simplified[relations.id] ? simplified[relations.id] : relations.id;
          }
        }
      }
    }

    // Now attach our results to the actual entities.
    for (const uuid in simplified) {
      entities[uuid]._record = simplified[uuid];
    }
  }

  /**
   * Helper function for detecting Vuex config methods.
   */
  static _vuexConfig() {
    let config = {
      vuexGetter: {},
      vuexAction: {},
      vuexMutation: {}
    };

    // Get all properties of our self and our ancestors.
    let props = {};
    let obj = this;
    do {
      Reflect.ownKeys(obj).forEach(key => {
        if (typeof key === "string") {
          props[key] = obj.name;
        }
      });
    } while (
      // Iterate over our entire list of ancestors, stopping when we get to
      // VuexStore's parent, BaseStore.
      (obj = Reflect.getPrototypeOf(obj)) &&
      obj.name !== "BaseStore"
    );

    Object.keys(props).forEach(methodName => {
      for (const methodPrefix in config) {
        // Check for the prefix. If it matches, register it.
        if (methodName.indexOf(methodPrefix) === 0) {
          // Name the Vuex action, getter, or mutation by stripping the prefix
          // and lower-casing the first letter of the method name.
          let vuexName = methodName.slice(methodPrefix.length);
          vuexName = vuexName.charAt(0).toLowerCase() + vuexName.slice(1);
          config[methodPrefix][vuexName] = this[methodName];
          break;
        }
      }
    });
    return config;
  }

  /**
   * A simple helper function for checking for required methods and properties
   * in lieu of support for actual OOP interfaces.
   */
  static _interfaceSimulation() {
    const props = [];
    Object.getOwnPropertyNames(this).forEach(propName => {
      if (typeof propName == "string") {
        props.push(propName);
      }
    });
    this._requiredProps().forEach(propName => {
      if (!props.includes(propName)) {
        console.error(
          `Class ${
          this.name
          } does not implement the required "${propName}" property.`,
          props
        );
      }
    });
  }

  /**
   * Axios request interceptor.
   */
  static _preprocessRequest(request) {
    // Log for debugging.
    if (this.constructor._debug) {
      console.debug(
        `Axios ${request.method.toUpperCase()} request to %c${request.baseURL}${request.url}`,
        "color: blue; font-weight: bold;",
        request
      );
    }

    return request;
  }

  /**
   * Axios response interceptor.
   */
  static _preprocessResponse(response) {
    // Log for debugging.
    if (this.constructor._debug) {
      console.debug(
        `Axios response from %c${response.config.url}`,
        "color: blue; font-weight: bold;",
        response
      );
    }

    return response;
  }
}
