/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.types = (function() {

    /**
     * Namespace types.
     * @exports types
     * @namespace
     */
    var types = {};

    types.Account = (function() {

        /**
         * Properties of an Account.
         * @memberof types
         * @interface IAccount
         * @property {Uint8Array|null} [address] Account address
         * @property {number|Long|null} [amount] Account amount
         */

        /**
         * Constructs a new Account.
         * @memberof types
         * @classdesc Represents an Account.
         * @implements IAccount
         * @constructor
         * @param {types.IAccount=} [properties] Properties to set
         */
        function Account(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Account address.
         * @member {Uint8Array} address
         * @memberof types.Account
         * @instance
         */
        Account.prototype.address = $util.newBuffer([]);

        /**
         * Account amount.
         * @member {number|Long} amount
         * @memberof types.Account
         * @instance
         */
        Account.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Account instance using the specified properties.
         * @function create
         * @memberof types.Account
         * @static
         * @param {types.IAccount=} [properties] Properties to set
         * @returns {types.Account} Account instance
         */
        Account.create = function create(properties) {
            return new Account(properties);
        };

        /**
         * Encodes the specified Account message. Does not implicitly {@link types.Account.verify|verify} messages.
         * @function encode
         * @memberof types.Account
         * @static
         * @param {types.IAccount} message Account message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Account.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.amount);
            return writer;
        };

        /**
         * Encodes the specified Account message, length delimited. Does not implicitly {@link types.Account.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Account
         * @static
         * @param {types.IAccount} message Account message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Account.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Account message from the specified reader or buffer.
         * @function decode
         * @memberof types.Account
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Account} Account
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Account.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Account();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.address = reader.bytes();
                        break;
                    }
                case 2: {
                        message.amount = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Account message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Account
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Account} Account
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Account.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Account message.
         * @function verify
         * @memberof types.Account
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Account.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.address != null && message.hasOwnProperty("address"))
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                    return "amount: integer|Long expected";
            return null;
        };

        /**
         * Creates an Account message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Account
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Account} Account
         */
        Account.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Account)
                return object;
            var message = new $root.types.Account();
            if (object.address != null)
                if (typeof object.address === "string")
                    $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                else if (object.address.length >= 0)
                    message.address = object.address;
            if (object.amount != null)
                if ($util.Long)
                    (message.amount = $util.Long.fromValue(object.amount)).unsigned = true;
                else if (typeof object.amount === "string")
                    message.amount = parseInt(object.amount, 10);
                else if (typeof object.amount === "number")
                    message.amount = object.amount;
                else if (typeof object.amount === "object")
                    message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from an Account message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Account
         * @static
         * @param {types.Account} message Account
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Account.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.address = "";
                else {
                    object.address = [];
                    if (options.bytes !== Array)
                        object.address = $util.newBuffer(object.address);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount = options.longs === String ? "0" : 0;
            }
            if (message.address != null && message.hasOwnProperty("address"))
                object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount === "number")
                    object.amount = options.longs === String ? String(message.amount) : message.amount;
                else
                    object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber(true) : message.amount;
            return object;
        };

        /**
         * Converts this Account to JSON.
         * @function toJSON
         * @memberof types.Account
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Account.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Account
         * @function getTypeUrl
         * @memberof types.Account
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Account.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Account";
        };

        return Account;
    })();

    types.Pool = (function() {

        /**
         * Properties of a Pool.
         * @memberof types
         * @interface IPool
         * @property {number|Long|null} [id] Pool id
         * @property {number|Long|null} [amount] Pool amount
         */

        /**
         * Constructs a new Pool.
         * @memberof types
         * @classdesc Represents a Pool.
         * @implements IPool
         * @constructor
         * @param {types.IPool=} [properties] Properties to set
         */
        function Pool(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Pool id.
         * @member {number|Long} id
         * @memberof types.Pool
         * @instance
         */
        Pool.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Pool amount.
         * @member {number|Long} amount
         * @memberof types.Pool
         * @instance
         */
        Pool.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Pool instance using the specified properties.
         * @function create
         * @memberof types.Pool
         * @static
         * @param {types.IPool=} [properties] Properties to set
         * @returns {types.Pool} Pool instance
         */
        Pool.create = function create(properties) {
            return new Pool(properties);
        };

        /**
         * Encodes the specified Pool message. Does not implicitly {@link types.Pool.verify|verify} messages.
         * @function encode
         * @memberof types.Pool
         * @static
         * @param {types.IPool} message Pool message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pool.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.amount);
            return writer;
        };

        /**
         * Encodes the specified Pool message, length delimited. Does not implicitly {@link types.Pool.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Pool
         * @static
         * @param {types.IPool} message Pool message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pool.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Pool message from the specified reader or buffer.
         * @function decode
         * @memberof types.Pool
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Pool} Pool
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pool.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Pool();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint64();
                        break;
                    }
                case 2: {
                        message.amount = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Pool message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Pool
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Pool} Pool
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pool.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Pool message.
         * @function verify
         * @memberof types.Pool
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Pool.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                    return "amount: integer|Long expected";
            return null;
        };

        /**
         * Creates a Pool message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Pool
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Pool} Pool
         */
        Pool.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Pool)
                return object;
            var message = new $root.types.Pool();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.amount != null)
                if ($util.Long)
                    (message.amount = $util.Long.fromValue(object.amount)).unsigned = true;
                else if (typeof object.amount === "string")
                    message.amount = parseInt(object.amount, 10);
                else if (typeof object.amount === "number")
                    message.amount = object.amount;
                else if (typeof object.amount === "object")
                    message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Pool message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Pool
         * @static
         * @param {types.Pool} message Pool
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Pool.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount === "number")
                    object.amount = options.longs === String ? String(message.amount) : message.amount;
                else
                    object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber(true) : message.amount;
            return object;
        };

        /**
         * Converts this Pool to JSON.
         * @function toJSON
         * @memberof types.Pool
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Pool.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Pool
         * @function getTypeUrl
         * @memberof types.Pool
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Pool.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Pool";
        };

        return Pool;
    })();

    types.Event = (function() {

        /**
         * Properties of an Event.
         * @memberof types
         * @interface IEvent
         * @property {string|null} [eventType] Event eventType
         * @property {types.IEventCustom|null} [custom] Event custom
         * @property {number|Long|null} [height] Event height
         * @property {string|null} [reference] Event reference
         * @property {number|Long|null} [chainId] Event chainId
         * @property {number|Long|null} [blockHeight] Event blockHeight
         * @property {Uint8Array|null} [blockHash] Event blockHash
         * @property {Uint8Array|null} [address] Event address
         */

        /**
         * Constructs a new Event.
         * @memberof types
         * @classdesc Represents an Event.
         * @implements IEvent
         * @constructor
         * @param {types.IEvent=} [properties] Properties to set
         */
        function Event(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Event eventType.
         * @member {string} eventType
         * @memberof types.Event
         * @instance
         */
        Event.prototype.eventType = "";

        /**
         * Event custom.
         * @member {types.IEventCustom|null|undefined} custom
         * @memberof types.Event
         * @instance
         */
        Event.prototype.custom = null;

        /**
         * Event height.
         * @member {number|Long} height
         * @memberof types.Event
         * @instance
         */
        Event.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Event reference.
         * @member {string} reference
         * @memberof types.Event
         * @instance
         */
        Event.prototype.reference = "";

        /**
         * Event chainId.
         * @member {number|Long} chainId
         * @memberof types.Event
         * @instance
         */
        Event.prototype.chainId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Event blockHeight.
         * @member {number|Long} blockHeight
         * @memberof types.Event
         * @instance
         */
        Event.prototype.blockHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Event blockHash.
         * @member {Uint8Array} blockHash
         * @memberof types.Event
         * @instance
         */
        Event.prototype.blockHash = $util.newBuffer([]);

        /**
         * Event address.
         * @member {Uint8Array} address
         * @memberof types.Event
         * @instance
         */
        Event.prototype.address = $util.newBuffer([]);

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * Event msg.
         * @member {"custom"|undefined} msg
         * @memberof types.Event
         * @instance
         */
        Object.defineProperty(Event.prototype, "msg", {
            get: $util.oneOfGetter($oneOfFields = ["custom"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Event instance using the specified properties.
         * @function create
         * @memberof types.Event
         * @static
         * @param {types.IEvent=} [properties] Properties to set
         * @returns {types.Event} Event instance
         */
        Event.create = function create(properties) {
            return new Event(properties);
        };

        /**
         * Encodes the specified Event message. Does not implicitly {@link types.Event.verify|verify} messages.
         * @function encode
         * @memberof types.Event
         * @static
         * @param {types.IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.eventType != null && Object.hasOwnProperty.call(message, "eventType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.eventType);
            if (message.custom != null && Object.hasOwnProperty.call(message, "custom"))
                $root.types.EventCustom.encode(message.custom, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 91, wireType 0 =*/728).uint64(message.height);
            if (message.reference != null && Object.hasOwnProperty.call(message, "reference"))
                writer.uint32(/* id 92, wireType 2 =*/738).string(message.reference);
            if (message.chainId != null && Object.hasOwnProperty.call(message, "chainId"))
                writer.uint32(/* id 93, wireType 0 =*/744).uint64(message.chainId);
            if (message.blockHeight != null && Object.hasOwnProperty.call(message, "blockHeight"))
                writer.uint32(/* id 94, wireType 0 =*/752).uint64(message.blockHeight);
            if (message.blockHash != null && Object.hasOwnProperty.call(message, "blockHash"))
                writer.uint32(/* id 95, wireType 2 =*/762).bytes(message.blockHash);
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                writer.uint32(/* id 96, wireType 2 =*/770).bytes(message.address);
            return writer;
        };

        /**
         * Encodes the specified Event message, length delimited. Does not implicitly {@link types.Event.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Event
         * @static
         * @param {types.IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @function decode
         * @memberof types.Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Event();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.eventType = reader.string();
                        break;
                    }
                case 11: {
                        message.custom = $root.types.EventCustom.decode(reader, reader.uint32());
                        break;
                    }
                case 91: {
                        message.height = reader.uint64();
                        break;
                    }
                case 92: {
                        message.reference = reader.string();
                        break;
                    }
                case 93: {
                        message.chainId = reader.uint64();
                        break;
                    }
                case 94: {
                        message.blockHeight = reader.uint64();
                        break;
                    }
                case 95: {
                        message.blockHash = reader.bytes();
                        break;
                    }
                case 96: {
                        message.address = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Event message.
         * @function verify
         * @memberof types.Event
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Event.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.eventType != null && message.hasOwnProperty("eventType"))
                if (!$util.isString(message.eventType))
                    return "eventType: string expected";
            if (message.custom != null && message.hasOwnProperty("custom")) {
                properties.msg = 1;
                {
                    var error = $root.types.EventCustom.verify(message.custom);
                    if (error)
                        return "custom." + error;
                }
            }
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            if (message.reference != null && message.hasOwnProperty("reference"))
                if (!$util.isString(message.reference))
                    return "reference: string expected";
            if (message.chainId != null && message.hasOwnProperty("chainId"))
                if (!$util.isInteger(message.chainId) && !(message.chainId && $util.isInteger(message.chainId.low) && $util.isInteger(message.chainId.high)))
                    return "chainId: integer|Long expected";
            if (message.blockHeight != null && message.hasOwnProperty("blockHeight"))
                if (!$util.isInteger(message.blockHeight) && !(message.blockHeight && $util.isInteger(message.blockHeight.low) && $util.isInteger(message.blockHeight.high)))
                    return "blockHeight: integer|Long expected";
            if (message.blockHash != null && message.hasOwnProperty("blockHash"))
                if (!(message.blockHash && typeof message.blockHash.length === "number" || $util.isString(message.blockHash)))
                    return "blockHash: buffer expected";
            if (message.address != null && message.hasOwnProperty("address"))
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
            return null;
        };

        /**
         * Creates an Event message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Event
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Event} Event
         */
        Event.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Event)
                return object;
            var message = new $root.types.Event();
            if (object.eventType != null)
                message.eventType = String(object.eventType);
            if (object.custom != null) {
                if (typeof object.custom !== "object")
                    throw TypeError(".types.Event.custom: object expected");
                message.custom = $root.types.EventCustom.fromObject(object.custom);
            }
            if (object.height != null)
                if ($util.Long)
                    (message.height = $util.Long.fromValue(object.height)).unsigned = true;
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
            if (object.reference != null)
                message.reference = String(object.reference);
            if (object.chainId != null)
                if ($util.Long)
                    (message.chainId = $util.Long.fromValue(object.chainId)).unsigned = true;
                else if (typeof object.chainId === "string")
                    message.chainId = parseInt(object.chainId, 10);
                else if (typeof object.chainId === "number")
                    message.chainId = object.chainId;
                else if (typeof object.chainId === "object")
                    message.chainId = new $util.LongBits(object.chainId.low >>> 0, object.chainId.high >>> 0).toNumber(true);
            if (object.blockHeight != null)
                if ($util.Long)
                    (message.blockHeight = $util.Long.fromValue(object.blockHeight)).unsigned = true;
                else if (typeof object.blockHeight === "string")
                    message.blockHeight = parseInt(object.blockHeight, 10);
                else if (typeof object.blockHeight === "number")
                    message.blockHeight = object.blockHeight;
                else if (typeof object.blockHeight === "object")
                    message.blockHeight = new $util.LongBits(object.blockHeight.low >>> 0, object.blockHeight.high >>> 0).toNumber(true);
            if (object.blockHash != null)
                if (typeof object.blockHash === "string")
                    $util.base64.decode(object.blockHash, message.blockHash = $util.newBuffer($util.base64.length(object.blockHash)), 0);
                else if (object.blockHash.length >= 0)
                    message.blockHash = object.blockHash;
            if (object.address != null)
                if (typeof object.address === "string")
                    $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                else if (object.address.length >= 0)
                    message.address = object.address;
            return message;
        };

        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Event
         * @static
         * @param {types.Event} message Event
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Event.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.eventType = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.height = options.longs === String ? "0" : 0;
                object.reference = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.chainId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.chainId = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.blockHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.blockHeight = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.blockHash = "";
                else {
                    object.blockHash = [];
                    if (options.bytes !== Array)
                        object.blockHash = $util.newBuffer(object.blockHash);
                }
                if (options.bytes === String)
                    object.address = "";
                else {
                    object.address = [];
                    if (options.bytes !== Array)
                        object.address = $util.newBuffer(object.address);
                }
            }
            if (message.eventType != null && message.hasOwnProperty("eventType"))
                object.eventType = message.eventType;
            if (message.custom != null && message.hasOwnProperty("custom")) {
                object.custom = $root.types.EventCustom.toObject(message.custom, options);
                if (options.oneofs)
                    object.msg = "custom";
            }
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
            if (message.reference != null && message.hasOwnProperty("reference"))
                object.reference = message.reference;
            if (message.chainId != null && message.hasOwnProperty("chainId"))
                if (typeof message.chainId === "number")
                    object.chainId = options.longs === String ? String(message.chainId) : message.chainId;
                else
                    object.chainId = options.longs === String ? $util.Long.prototype.toString.call(message.chainId) : options.longs === Number ? new $util.LongBits(message.chainId.low >>> 0, message.chainId.high >>> 0).toNumber(true) : message.chainId;
            if (message.blockHeight != null && message.hasOwnProperty("blockHeight"))
                if (typeof message.blockHeight === "number")
                    object.blockHeight = options.longs === String ? String(message.blockHeight) : message.blockHeight;
                else
                    object.blockHeight = options.longs === String ? $util.Long.prototype.toString.call(message.blockHeight) : options.longs === Number ? new $util.LongBits(message.blockHeight.low >>> 0, message.blockHeight.high >>> 0).toNumber(true) : message.blockHeight;
            if (message.blockHash != null && message.hasOwnProperty("blockHash"))
                object.blockHash = options.bytes === String ? $util.base64.encode(message.blockHash, 0, message.blockHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.blockHash) : message.blockHash;
            if (message.address != null && message.hasOwnProperty("address"))
                object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
            return object;
        };

        /**
         * Converts this Event to JSON.
         * @function toJSON
         * @memberof types.Event
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Event.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Event
         * @function getTypeUrl
         * @memberof types.Event
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Event.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Event";
        };

        return Event;
    })();

    types.EventCustom = (function() {

        /**
         * Properties of an EventCustom.
         * @memberof types
         * @interface IEventCustom
         * @property {google.protobuf.IAny|null} [msg] EventCustom msg
         */

        /**
         * Constructs a new EventCustom.
         * @memberof types
         * @classdesc Represents an EventCustom.
         * @implements IEventCustom
         * @constructor
         * @param {types.IEventCustom=} [properties] Properties to set
         */
        function EventCustom(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EventCustom msg.
         * @member {google.protobuf.IAny|null|undefined} msg
         * @memberof types.EventCustom
         * @instance
         */
        EventCustom.prototype.msg = null;

        /**
         * Creates a new EventCustom instance using the specified properties.
         * @function create
         * @memberof types.EventCustom
         * @static
         * @param {types.IEventCustom=} [properties] Properties to set
         * @returns {types.EventCustom} EventCustom instance
         */
        EventCustom.create = function create(properties) {
            return new EventCustom(properties);
        };

        /**
         * Encodes the specified EventCustom message. Does not implicitly {@link types.EventCustom.verify|verify} messages.
         * @function encode
         * @memberof types.EventCustom
         * @static
         * @param {types.IEventCustom} message EventCustom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventCustom.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                $root.google.protobuf.Any.encode(message.msg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EventCustom message, length delimited. Does not implicitly {@link types.EventCustom.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.EventCustom
         * @static
         * @param {types.IEventCustom} message EventCustom message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventCustom.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EventCustom message from the specified reader or buffer.
         * @function decode
         * @memberof types.EventCustom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.EventCustom} EventCustom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventCustom.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.EventCustom();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.msg = $root.google.protobuf.Any.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EventCustom message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.EventCustom
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.EventCustom} EventCustom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventCustom.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EventCustom message.
         * @function verify
         * @memberof types.EventCustom
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EventCustom.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msg != null && message.hasOwnProperty("msg")) {
                var error = $root.google.protobuf.Any.verify(message.msg);
                if (error)
                    return "msg." + error;
            }
            return null;
        };

        /**
         * Creates an EventCustom message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.EventCustom
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.EventCustom} EventCustom
         */
        EventCustom.fromObject = function fromObject(object) {
            if (object instanceof $root.types.EventCustom)
                return object;
            var message = new $root.types.EventCustom();
            if (object.msg != null) {
                if (typeof object.msg !== "object")
                    throw TypeError(".types.EventCustom.msg: object expected");
                message.msg = $root.google.protobuf.Any.fromObject(object.msg);
            }
            return message;
        };

        /**
         * Creates a plain object from an EventCustom message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.EventCustom
         * @static
         * @param {types.EventCustom} message EventCustom
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EventCustom.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.msg = null;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = $root.google.protobuf.Any.toObject(message.msg, options);
            return object;
        };

        /**
         * Converts this EventCustom to JSON.
         * @function toJSON
         * @memberof types.EventCustom
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EventCustom.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EventCustom
         * @function getTypeUrl
         * @memberof types.EventCustom
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EventCustom.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.EventCustom";
        };

        return EventCustom;
    })();

    types.FSMToPlugin = (function() {

        /**
         * Properties of a FSMToPlugin.
         * @memberof types
         * @interface IFSMToPlugin
         * @property {number|Long|null} [id] FSMToPlugin id
         * @property {types.IPluginFSMConfig|null} [config] FSMToPlugin config
         * @property {types.IPluginGenesisRequest|null} [genesis] FSMToPlugin genesis
         * @property {types.IPluginBeginRequest|null} [begin] FSMToPlugin begin
         * @property {types.IPluginCheckRequest|null} [check] FSMToPlugin check
         * @property {types.IPluginDeliverRequest|null} [deliver] FSMToPlugin deliver
         * @property {types.IPluginEndRequest|null} [end] FSMToPlugin end
         * @property {types.IPluginStateReadResponse|null} [stateRead] FSMToPlugin stateRead
         * @property {types.IPluginStateWriteResponse|null} [stateWrite] FSMToPlugin stateWrite
         * @property {types.IPluginQueryResponse|null} [query] FSMToPlugin query
         * @property {types.IPluginError|null} [error] FSMToPlugin error
         */

        /**
         * Constructs a new FSMToPlugin.
         * @memberof types
         * @classdesc Represents a FSMToPlugin.
         * @implements IFSMToPlugin
         * @constructor
         * @param {types.IFSMToPlugin=} [properties] Properties to set
         */
        function FSMToPlugin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FSMToPlugin id.
         * @member {number|Long} id
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * FSMToPlugin config.
         * @member {types.IPluginFSMConfig|null|undefined} config
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.config = null;

        /**
         * FSMToPlugin genesis.
         * @member {types.IPluginGenesisRequest|null|undefined} genesis
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.genesis = null;

        /**
         * FSMToPlugin begin.
         * @member {types.IPluginBeginRequest|null|undefined} begin
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.begin = null;

        /**
         * FSMToPlugin check.
         * @member {types.IPluginCheckRequest|null|undefined} check
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.check = null;

        /**
         * FSMToPlugin deliver.
         * @member {types.IPluginDeliverRequest|null|undefined} deliver
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.deliver = null;

        /**
         * FSMToPlugin end.
         * @member {types.IPluginEndRequest|null|undefined} end
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.end = null;

        /**
         * FSMToPlugin stateRead.
         * @member {types.IPluginStateReadResponse|null|undefined} stateRead
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.stateRead = null;

        /**
         * FSMToPlugin stateWrite.
         * @member {types.IPluginStateWriteResponse|null|undefined} stateWrite
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.stateWrite = null;

        /**
         * FSMToPlugin query.
         * @member {types.IPluginQueryResponse|null|undefined} query
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.query = null;

        /**
         * FSMToPlugin error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.FSMToPlugin
         * @instance
         */
        FSMToPlugin.prototype.error = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * FSMToPlugin payload.
         * @member {"config"|"genesis"|"begin"|"check"|"deliver"|"end"|"stateRead"|"stateWrite"|"query"|"error"|undefined} payload
         * @memberof types.FSMToPlugin
         * @instance
         */
        Object.defineProperty(FSMToPlugin.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["config", "genesis", "begin", "check", "deliver", "end", "stateRead", "stateWrite", "query", "error"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new FSMToPlugin instance using the specified properties.
         * @function create
         * @memberof types.FSMToPlugin
         * @static
         * @param {types.IFSMToPlugin=} [properties] Properties to set
         * @returns {types.FSMToPlugin} FSMToPlugin instance
         */
        FSMToPlugin.create = function create(properties) {
            return new FSMToPlugin(properties);
        };

        /**
         * Encodes the specified FSMToPlugin message. Does not implicitly {@link types.FSMToPlugin.verify|verify} messages.
         * @function encode
         * @memberof types.FSMToPlugin
         * @static
         * @param {types.IFSMToPlugin} message FSMToPlugin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FSMToPlugin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                $root.types.PluginFSMConfig.encode(message.config, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.genesis != null && Object.hasOwnProperty.call(message, "genesis"))
                $root.types.PluginGenesisRequest.encode(message.genesis, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.begin != null && Object.hasOwnProperty.call(message, "begin"))
                $root.types.PluginBeginRequest.encode(message.begin, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.check != null && Object.hasOwnProperty.call(message, "check"))
                $root.types.PluginCheckRequest.encode(message.check, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.deliver != null && Object.hasOwnProperty.call(message, "deliver"))
                $root.types.PluginDeliverRequest.encode(message.deliver, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                $root.types.PluginEndRequest.encode(message.end, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.stateRead != null && Object.hasOwnProperty.call(message, "stateRead"))
                $root.types.PluginStateReadResponse.encode(message.stateRead, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.stateWrite != null && Object.hasOwnProperty.call(message, "stateWrite"))
                $root.types.PluginStateWriteResponse.encode(message.stateWrite, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.query != null && Object.hasOwnProperty.call(message, "query"))
                $root.types.PluginQueryResponse.encode(message.query, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified FSMToPlugin message, length delimited. Does not implicitly {@link types.FSMToPlugin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.FSMToPlugin
         * @static
         * @param {types.IFSMToPlugin} message FSMToPlugin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FSMToPlugin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FSMToPlugin message from the specified reader or buffer.
         * @function decode
         * @memberof types.FSMToPlugin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.FSMToPlugin} FSMToPlugin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FSMToPlugin.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.FSMToPlugin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint64();
                        break;
                    }
                case 2: {
                        message.config = $root.types.PluginFSMConfig.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.genesis = $root.types.PluginGenesisRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.begin = $root.types.PluginBeginRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.check = $root.types.PluginCheckRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.deliver = $root.types.PluginDeliverRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.end = $root.types.PluginEndRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        message.stateRead = $root.types.PluginStateReadResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 9: {
                        message.stateWrite = $root.types.PluginStateWriteResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 10: {
                        message.query = $root.types.PluginQueryResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FSMToPlugin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.FSMToPlugin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.FSMToPlugin} FSMToPlugin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FSMToPlugin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FSMToPlugin message.
         * @function verify
         * @memberof types.FSMToPlugin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FSMToPlugin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.config != null && message.hasOwnProperty("config")) {
                properties.payload = 1;
                {
                    var error = $root.types.PluginFSMConfig.verify(message.config);
                    if (error)
                        return "config." + error;
                }
            }
            if (message.genesis != null && message.hasOwnProperty("genesis")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginGenesisRequest.verify(message.genesis);
                    if (error)
                        return "genesis." + error;
                }
            }
            if (message.begin != null && message.hasOwnProperty("begin")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginBeginRequest.verify(message.begin);
                    if (error)
                        return "begin." + error;
                }
            }
            if (message.check != null && message.hasOwnProperty("check")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginCheckRequest.verify(message.check);
                    if (error)
                        return "check." + error;
                }
            }
            if (message.deliver != null && message.hasOwnProperty("deliver")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginDeliverRequest.verify(message.deliver);
                    if (error)
                        return "deliver." + error;
                }
            }
            if (message.end != null && message.hasOwnProperty("end")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginEndRequest.verify(message.end);
                    if (error)
                        return "end." + error;
                }
            }
            if (message.stateRead != null && message.hasOwnProperty("stateRead")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginStateReadResponse.verify(message.stateRead);
                    if (error)
                        return "stateRead." + error;
                }
            }
            if (message.stateWrite != null && message.hasOwnProperty("stateWrite")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginStateWriteResponse.verify(message.stateWrite);
                    if (error)
                        return "stateWrite." + error;
                }
            }
            if (message.query != null && message.hasOwnProperty("query")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginQueryResponse.verify(message.query);
                    if (error)
                        return "query." + error;
                }
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginError.verify(message.error);
                    if (error)
                        return "error." + error;
                }
            }
            return null;
        };

        /**
         * Creates a FSMToPlugin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.FSMToPlugin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.FSMToPlugin} FSMToPlugin
         */
        FSMToPlugin.fromObject = function fromObject(object) {
            if (object instanceof $root.types.FSMToPlugin)
                return object;
            var message = new $root.types.FSMToPlugin();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.config != null) {
                if (typeof object.config !== "object")
                    throw TypeError(".types.FSMToPlugin.config: object expected");
                message.config = $root.types.PluginFSMConfig.fromObject(object.config);
            }
            if (object.genesis != null) {
                if (typeof object.genesis !== "object")
                    throw TypeError(".types.FSMToPlugin.genesis: object expected");
                message.genesis = $root.types.PluginGenesisRequest.fromObject(object.genesis);
            }
            if (object.begin != null) {
                if (typeof object.begin !== "object")
                    throw TypeError(".types.FSMToPlugin.begin: object expected");
                message.begin = $root.types.PluginBeginRequest.fromObject(object.begin);
            }
            if (object.check != null) {
                if (typeof object.check !== "object")
                    throw TypeError(".types.FSMToPlugin.check: object expected");
                message.check = $root.types.PluginCheckRequest.fromObject(object.check);
            }
            if (object.deliver != null) {
                if (typeof object.deliver !== "object")
                    throw TypeError(".types.FSMToPlugin.deliver: object expected");
                message.deliver = $root.types.PluginDeliverRequest.fromObject(object.deliver);
            }
            if (object.end != null) {
                if (typeof object.end !== "object")
                    throw TypeError(".types.FSMToPlugin.end: object expected");
                message.end = $root.types.PluginEndRequest.fromObject(object.end);
            }
            if (object.stateRead != null) {
                if (typeof object.stateRead !== "object")
                    throw TypeError(".types.FSMToPlugin.stateRead: object expected");
                message.stateRead = $root.types.PluginStateReadResponse.fromObject(object.stateRead);
            }
            if (object.stateWrite != null) {
                if (typeof object.stateWrite !== "object")
                    throw TypeError(".types.FSMToPlugin.stateWrite: object expected");
                message.stateWrite = $root.types.PluginStateWriteResponse.fromObject(object.stateWrite);
            }
            if (object.query != null) {
                if (typeof object.query !== "object")
                    throw TypeError(".types.FSMToPlugin.query: object expected");
                message.query = $root.types.PluginQueryResponse.fromObject(object.query);
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".types.FSMToPlugin.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a FSMToPlugin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.FSMToPlugin
         * @static
         * @param {types.FSMToPlugin} message FSMToPlugin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FSMToPlugin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.config != null && message.hasOwnProperty("config")) {
                object.config = $root.types.PluginFSMConfig.toObject(message.config, options);
                if (options.oneofs)
                    object.payload = "config";
            }
            if (message.genesis != null && message.hasOwnProperty("genesis")) {
                object.genesis = $root.types.PluginGenesisRequest.toObject(message.genesis, options);
                if (options.oneofs)
                    object.payload = "genesis";
            }
            if (message.begin != null && message.hasOwnProperty("begin")) {
                object.begin = $root.types.PluginBeginRequest.toObject(message.begin, options);
                if (options.oneofs)
                    object.payload = "begin";
            }
            if (message.check != null && message.hasOwnProperty("check")) {
                object.check = $root.types.PluginCheckRequest.toObject(message.check, options);
                if (options.oneofs)
                    object.payload = "check";
            }
            if (message.deliver != null && message.hasOwnProperty("deliver")) {
                object.deliver = $root.types.PluginDeliverRequest.toObject(message.deliver, options);
                if (options.oneofs)
                    object.payload = "deliver";
            }
            if (message.end != null && message.hasOwnProperty("end")) {
                object.end = $root.types.PluginEndRequest.toObject(message.end, options);
                if (options.oneofs)
                    object.payload = "end";
            }
            if (message.stateRead != null && message.hasOwnProperty("stateRead")) {
                object.stateRead = $root.types.PluginStateReadResponse.toObject(message.stateRead, options);
                if (options.oneofs)
                    object.payload = "stateRead";
            }
            if (message.stateWrite != null && message.hasOwnProperty("stateWrite")) {
                object.stateWrite = $root.types.PluginStateWriteResponse.toObject(message.stateWrite, options);
                if (options.oneofs)
                    object.payload = "stateWrite";
            }
            if (message.query != null && message.hasOwnProperty("query")) {
                object.query = $root.types.PluginQueryResponse.toObject(message.query, options);
                if (options.oneofs)
                    object.payload = "query";
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                object.error = $root.types.PluginError.toObject(message.error, options);
                if (options.oneofs)
                    object.payload = "error";
            }
            return object;
        };

        /**
         * Converts this FSMToPlugin to JSON.
         * @function toJSON
         * @memberof types.FSMToPlugin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FSMToPlugin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for FSMToPlugin
         * @function getTypeUrl
         * @memberof types.FSMToPlugin
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        FSMToPlugin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.FSMToPlugin";
        };

        return FSMToPlugin;
    })();

    types.PluginToFSM = (function() {

        /**
         * Properties of a PluginToFSM.
         * @memberof types
         * @interface IPluginToFSM
         * @property {number|Long|null} [id] PluginToFSM id
         * @property {types.IPluginConfig|null} [config] PluginToFSM config
         * @property {types.IPluginGenesisResponse|null} [genesis] PluginToFSM genesis
         * @property {types.IPluginBeginResponse|null} [begin] PluginToFSM begin
         * @property {types.IPluginCheckResponse|null} [check] PluginToFSM check
         * @property {types.IPluginDeliverResponse|null} [deliver] PluginToFSM deliver
         * @property {types.IPluginEndResponse|null} [end] PluginToFSM end
         * @property {types.IPluginStateReadRequest|null} [stateRead] PluginToFSM stateRead
         * @property {types.IPluginStateWriteRequest|null} [stateWrite] PluginToFSM stateWrite
         * @property {types.IPluginQueryRequest|null} [query] PluginToFSM query
         */

        /**
         * Constructs a new PluginToFSM.
         * @memberof types
         * @classdesc Represents a PluginToFSM.
         * @implements IPluginToFSM
         * @constructor
         * @param {types.IPluginToFSM=} [properties] Properties to set
         */
        function PluginToFSM(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginToFSM id.
         * @member {number|Long} id
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginToFSM config.
         * @member {types.IPluginConfig|null|undefined} config
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.config = null;

        /**
         * PluginToFSM genesis.
         * @member {types.IPluginGenesisResponse|null|undefined} genesis
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.genesis = null;

        /**
         * PluginToFSM begin.
         * @member {types.IPluginBeginResponse|null|undefined} begin
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.begin = null;

        /**
         * PluginToFSM check.
         * @member {types.IPluginCheckResponse|null|undefined} check
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.check = null;

        /**
         * PluginToFSM deliver.
         * @member {types.IPluginDeliverResponse|null|undefined} deliver
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.deliver = null;

        /**
         * PluginToFSM end.
         * @member {types.IPluginEndResponse|null|undefined} end
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.end = null;

        /**
         * PluginToFSM stateRead.
         * @member {types.IPluginStateReadRequest|null|undefined} stateRead
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.stateRead = null;

        /**
         * PluginToFSM stateWrite.
         * @member {types.IPluginStateWriteRequest|null|undefined} stateWrite
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.stateWrite = null;

        /**
         * PluginToFSM query.
         * @member {types.IPluginQueryRequest|null|undefined} query
         * @memberof types.PluginToFSM
         * @instance
         */
        PluginToFSM.prototype.query = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * PluginToFSM payload.
         * @member {"config"|"genesis"|"begin"|"check"|"deliver"|"end"|"stateRead"|"stateWrite"|"query"|undefined} payload
         * @memberof types.PluginToFSM
         * @instance
         */
        Object.defineProperty(PluginToFSM.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["config", "genesis", "begin", "check", "deliver", "end", "stateRead", "stateWrite", "query"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new PluginToFSM instance using the specified properties.
         * @function create
         * @memberof types.PluginToFSM
         * @static
         * @param {types.IPluginToFSM=} [properties] Properties to set
         * @returns {types.PluginToFSM} PluginToFSM instance
         */
        PluginToFSM.create = function create(properties) {
            return new PluginToFSM(properties);
        };

        /**
         * Encodes the specified PluginToFSM message. Does not implicitly {@link types.PluginToFSM.verify|verify} messages.
         * @function encode
         * @memberof types.PluginToFSM
         * @static
         * @param {types.IPluginToFSM} message PluginToFSM message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginToFSM.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                $root.types.PluginConfig.encode(message.config, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.genesis != null && Object.hasOwnProperty.call(message, "genesis"))
                $root.types.PluginGenesisResponse.encode(message.genesis, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.begin != null && Object.hasOwnProperty.call(message, "begin"))
                $root.types.PluginBeginResponse.encode(message.begin, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.check != null && Object.hasOwnProperty.call(message, "check"))
                $root.types.PluginCheckResponse.encode(message.check, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.deliver != null && Object.hasOwnProperty.call(message, "deliver"))
                $root.types.PluginDeliverResponse.encode(message.deliver, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.end != null && Object.hasOwnProperty.call(message, "end"))
                $root.types.PluginEndResponse.encode(message.end, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.stateRead != null && Object.hasOwnProperty.call(message, "stateRead"))
                $root.types.PluginStateReadRequest.encode(message.stateRead, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.stateWrite != null && Object.hasOwnProperty.call(message, "stateWrite"))
                $root.types.PluginStateWriteRequest.encode(message.stateWrite, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.query != null && Object.hasOwnProperty.call(message, "query"))
                $root.types.PluginQueryRequest.encode(message.query, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginToFSM message, length delimited. Does not implicitly {@link types.PluginToFSM.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginToFSM
         * @static
         * @param {types.IPluginToFSM} message PluginToFSM message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginToFSM.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginToFSM message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginToFSM
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginToFSM} PluginToFSM
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginToFSM.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginToFSM();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint64();
                        break;
                    }
                case 2: {
                        message.config = $root.types.PluginConfig.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.genesis = $root.types.PluginGenesisResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.begin = $root.types.PluginBeginResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.check = $root.types.PluginCheckResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.deliver = $root.types.PluginDeliverResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.end = $root.types.PluginEndResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        message.stateRead = $root.types.PluginStateReadRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 9: {
                        message.stateWrite = $root.types.PluginStateWriteRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 10: {
                        message.query = $root.types.PluginQueryRequest.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginToFSM message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginToFSM
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginToFSM} PluginToFSM
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginToFSM.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginToFSM message.
         * @function verify
         * @memberof types.PluginToFSM
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginToFSM.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.config != null && message.hasOwnProperty("config")) {
                properties.payload = 1;
                {
                    var error = $root.types.PluginConfig.verify(message.config);
                    if (error)
                        return "config." + error;
                }
            }
            if (message.genesis != null && message.hasOwnProperty("genesis")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginGenesisResponse.verify(message.genesis);
                    if (error)
                        return "genesis." + error;
                }
            }
            if (message.begin != null && message.hasOwnProperty("begin")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginBeginResponse.verify(message.begin);
                    if (error)
                        return "begin." + error;
                }
            }
            if (message.check != null && message.hasOwnProperty("check")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginCheckResponse.verify(message.check);
                    if (error)
                        return "check." + error;
                }
            }
            if (message.deliver != null && message.hasOwnProperty("deliver")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginDeliverResponse.verify(message.deliver);
                    if (error)
                        return "deliver." + error;
                }
            }
            if (message.end != null && message.hasOwnProperty("end")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginEndResponse.verify(message.end);
                    if (error)
                        return "end." + error;
                }
            }
            if (message.stateRead != null && message.hasOwnProperty("stateRead")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginStateReadRequest.verify(message.stateRead);
                    if (error)
                        return "stateRead." + error;
                }
            }
            if (message.stateWrite != null && message.hasOwnProperty("stateWrite")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginStateWriteRequest.verify(message.stateWrite);
                    if (error)
                        return "stateWrite." + error;
                }
            }
            if (message.query != null && message.hasOwnProperty("query")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.types.PluginQueryRequest.verify(message.query);
                    if (error)
                        return "query." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PluginToFSM message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginToFSM
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginToFSM} PluginToFSM
         */
        PluginToFSM.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginToFSM)
                return object;
            var message = new $root.types.PluginToFSM();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.config != null) {
                if (typeof object.config !== "object")
                    throw TypeError(".types.PluginToFSM.config: object expected");
                message.config = $root.types.PluginConfig.fromObject(object.config);
            }
            if (object.genesis != null) {
                if (typeof object.genesis !== "object")
                    throw TypeError(".types.PluginToFSM.genesis: object expected");
                message.genesis = $root.types.PluginGenesisResponse.fromObject(object.genesis);
            }
            if (object.begin != null) {
                if (typeof object.begin !== "object")
                    throw TypeError(".types.PluginToFSM.begin: object expected");
                message.begin = $root.types.PluginBeginResponse.fromObject(object.begin);
            }
            if (object.check != null) {
                if (typeof object.check !== "object")
                    throw TypeError(".types.PluginToFSM.check: object expected");
                message.check = $root.types.PluginCheckResponse.fromObject(object.check);
            }
            if (object.deliver != null) {
                if (typeof object.deliver !== "object")
                    throw TypeError(".types.PluginToFSM.deliver: object expected");
                message.deliver = $root.types.PluginDeliverResponse.fromObject(object.deliver);
            }
            if (object.end != null) {
                if (typeof object.end !== "object")
                    throw TypeError(".types.PluginToFSM.end: object expected");
                message.end = $root.types.PluginEndResponse.fromObject(object.end);
            }
            if (object.stateRead != null) {
                if (typeof object.stateRead !== "object")
                    throw TypeError(".types.PluginToFSM.stateRead: object expected");
                message.stateRead = $root.types.PluginStateReadRequest.fromObject(object.stateRead);
            }
            if (object.stateWrite != null) {
                if (typeof object.stateWrite !== "object")
                    throw TypeError(".types.PluginToFSM.stateWrite: object expected");
                message.stateWrite = $root.types.PluginStateWriteRequest.fromObject(object.stateWrite);
            }
            if (object.query != null) {
                if (typeof object.query !== "object")
                    throw TypeError(".types.PluginToFSM.query: object expected");
                message.query = $root.types.PluginQueryRequest.fromObject(object.query);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginToFSM message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginToFSM
         * @static
         * @param {types.PluginToFSM} message PluginToFSM
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginToFSM.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.config != null && message.hasOwnProperty("config")) {
                object.config = $root.types.PluginConfig.toObject(message.config, options);
                if (options.oneofs)
                    object.payload = "config";
            }
            if (message.genesis != null && message.hasOwnProperty("genesis")) {
                object.genesis = $root.types.PluginGenesisResponse.toObject(message.genesis, options);
                if (options.oneofs)
                    object.payload = "genesis";
            }
            if (message.begin != null && message.hasOwnProperty("begin")) {
                object.begin = $root.types.PluginBeginResponse.toObject(message.begin, options);
                if (options.oneofs)
                    object.payload = "begin";
            }
            if (message.check != null && message.hasOwnProperty("check")) {
                object.check = $root.types.PluginCheckResponse.toObject(message.check, options);
                if (options.oneofs)
                    object.payload = "check";
            }
            if (message.deliver != null && message.hasOwnProperty("deliver")) {
                object.deliver = $root.types.PluginDeliverResponse.toObject(message.deliver, options);
                if (options.oneofs)
                    object.payload = "deliver";
            }
            if (message.end != null && message.hasOwnProperty("end")) {
                object.end = $root.types.PluginEndResponse.toObject(message.end, options);
                if (options.oneofs)
                    object.payload = "end";
            }
            if (message.stateRead != null && message.hasOwnProperty("stateRead")) {
                object.stateRead = $root.types.PluginStateReadRequest.toObject(message.stateRead, options);
                if (options.oneofs)
                    object.payload = "stateRead";
            }
            if (message.stateWrite != null && message.hasOwnProperty("stateWrite")) {
                object.stateWrite = $root.types.PluginStateWriteRequest.toObject(message.stateWrite, options);
                if (options.oneofs)
                    object.payload = "stateWrite";
            }
            if (message.query != null && message.hasOwnProperty("query")) {
                object.query = $root.types.PluginQueryRequest.toObject(message.query, options);
                if (options.oneofs)
                    object.payload = "query";
            }
            return object;
        };

        /**
         * Converts this PluginToFSM to JSON.
         * @function toJSON
         * @memberof types.PluginToFSM
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginToFSM.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginToFSM
         * @function getTypeUrl
         * @memberof types.PluginToFSM
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginToFSM.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginToFSM";
        };

        return PluginToFSM;
    })();

    types.PluginConfig = (function() {

        /**
         * Properties of a PluginConfig.
         * @memberof types
         * @interface IPluginConfig
         * @property {string|null} [name] PluginConfig name
         * @property {number|Long|null} [id] PluginConfig id
         * @property {number|Long|null} [version] PluginConfig version
         * @property {Array.<string>|null} [supportedTransactions] PluginConfig supportedTransactions
         * @property {Array.<Uint8Array>|null} [fileDescriptorProtos] PluginConfig fileDescriptorProtos
         * @property {Array.<string>|null} [transactionTypeUrls] PluginConfig transactionTypeUrls
         * @property {Array.<string>|null} [eventTypeUrls] PluginConfig eventTypeUrls
         * @property {Array.<Uint8Array>|null} [customStatePrefixes] PluginConfig customStatePrefixes
         */

        /**
         * Constructs a new PluginConfig.
         * @memberof types
         * @classdesc Represents a PluginConfig.
         * @implements IPluginConfig
         * @constructor
         * @param {types.IPluginConfig=} [properties] Properties to set
         */
        function PluginConfig(properties) {
            this.supportedTransactions = [];
            this.fileDescriptorProtos = [];
            this.transactionTypeUrls = [];
            this.eventTypeUrls = [];
            this.customStatePrefixes = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginConfig name.
         * @member {string} name
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.name = "";

        /**
         * PluginConfig id.
         * @member {number|Long} id
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginConfig version.
         * @member {number|Long} version
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.version = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginConfig supportedTransactions.
         * @member {Array.<string>} supportedTransactions
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.supportedTransactions = $util.emptyArray;

        /**
         * PluginConfig fileDescriptorProtos.
         * @member {Array.<Uint8Array>} fileDescriptorProtos
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.fileDescriptorProtos = $util.emptyArray;

        /**
         * PluginConfig transactionTypeUrls.
         * @member {Array.<string>} transactionTypeUrls
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.transactionTypeUrls = $util.emptyArray;

        /**
         * PluginConfig eventTypeUrls.
         * @member {Array.<string>} eventTypeUrls
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.eventTypeUrls = $util.emptyArray;

        /**
         * PluginConfig customStatePrefixes.
         * @member {Array.<Uint8Array>} customStatePrefixes
         * @memberof types.PluginConfig
         * @instance
         */
        PluginConfig.prototype.customStatePrefixes = $util.emptyArray;

        /**
         * Creates a new PluginConfig instance using the specified properties.
         * @function create
         * @memberof types.PluginConfig
         * @static
         * @param {types.IPluginConfig=} [properties] Properties to set
         * @returns {types.PluginConfig} PluginConfig instance
         */
        PluginConfig.create = function create(properties) {
            return new PluginConfig(properties);
        };

        /**
         * Encodes the specified PluginConfig message. Does not implicitly {@link types.PluginConfig.verify|verify} messages.
         * @function encode
         * @memberof types.PluginConfig
         * @static
         * @param {types.IPluginConfig} message PluginConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.id);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.version);
            if (message.supportedTransactions != null && message.supportedTransactions.length)
                for (var i = 0; i < message.supportedTransactions.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.supportedTransactions[i]);
            if (message.fileDescriptorProtos != null && message.fileDescriptorProtos.length)
                for (var i = 0; i < message.fileDescriptorProtos.length; ++i)
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.fileDescriptorProtos[i]);
            if (message.transactionTypeUrls != null && message.transactionTypeUrls.length)
                for (var i = 0; i < message.transactionTypeUrls.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.transactionTypeUrls[i]);
            if (message.eventTypeUrls != null && message.eventTypeUrls.length)
                for (var i = 0; i < message.eventTypeUrls.length; ++i)
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.eventTypeUrls[i]);
            if (message.customStatePrefixes != null && message.customStatePrefixes.length)
                for (var i = 0; i < message.customStatePrefixes.length; ++i)
                    writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.customStatePrefixes[i]);
            return writer;
        };

        /**
         * Encodes the specified PluginConfig message, length delimited. Does not implicitly {@link types.PluginConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginConfig
         * @static
         * @param {types.IPluginConfig} message PluginConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginConfig message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginConfig} PluginConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginConfig.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                case 2: {
                        message.id = reader.uint64();
                        break;
                    }
                case 3: {
                        message.version = reader.uint64();
                        break;
                    }
                case 4: {
                        if (!(message.supportedTransactions && message.supportedTransactions.length))
                            message.supportedTransactions = [];
                        message.supportedTransactions.push(reader.string());
                        break;
                    }
                case 5: {
                        if (!(message.fileDescriptorProtos && message.fileDescriptorProtos.length))
                            message.fileDescriptorProtos = [];
                        message.fileDescriptorProtos.push(reader.bytes());
                        break;
                    }
                case 6: {
                        if (!(message.transactionTypeUrls && message.transactionTypeUrls.length))
                            message.transactionTypeUrls = [];
                        message.transactionTypeUrls.push(reader.string());
                        break;
                    }
                case 7: {
                        if (!(message.eventTypeUrls && message.eventTypeUrls.length))
                            message.eventTypeUrls = [];
                        message.eventTypeUrls.push(reader.string());
                        break;
                    }
                case 8: {
                        if (!(message.customStatePrefixes && message.customStatePrefixes.length))
                            message.customStatePrefixes = [];
                        message.customStatePrefixes.push(reader.bytes());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginConfig} PluginConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginConfig message.
         * @function verify
         * @memberof types.PluginConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version) && !(message.version && $util.isInteger(message.version.low) && $util.isInteger(message.version.high)))
                    return "version: integer|Long expected";
            if (message.supportedTransactions != null && message.hasOwnProperty("supportedTransactions")) {
                if (!Array.isArray(message.supportedTransactions))
                    return "supportedTransactions: array expected";
                for (var i = 0; i < message.supportedTransactions.length; ++i)
                    if (!$util.isString(message.supportedTransactions[i]))
                        return "supportedTransactions: string[] expected";
            }
            if (message.fileDescriptorProtos != null && message.hasOwnProperty("fileDescriptorProtos")) {
                if (!Array.isArray(message.fileDescriptorProtos))
                    return "fileDescriptorProtos: array expected";
                for (var i = 0; i < message.fileDescriptorProtos.length; ++i)
                    if (!(message.fileDescriptorProtos[i] && typeof message.fileDescriptorProtos[i].length === "number" || $util.isString(message.fileDescriptorProtos[i])))
                        return "fileDescriptorProtos: buffer[] expected";
            }
            if (message.transactionTypeUrls != null && message.hasOwnProperty("transactionTypeUrls")) {
                if (!Array.isArray(message.transactionTypeUrls))
                    return "transactionTypeUrls: array expected";
                for (var i = 0; i < message.transactionTypeUrls.length; ++i)
                    if (!$util.isString(message.transactionTypeUrls[i]))
                        return "transactionTypeUrls: string[] expected";
            }
            if (message.eventTypeUrls != null && message.hasOwnProperty("eventTypeUrls")) {
                if (!Array.isArray(message.eventTypeUrls))
                    return "eventTypeUrls: array expected";
                for (var i = 0; i < message.eventTypeUrls.length; ++i)
                    if (!$util.isString(message.eventTypeUrls[i]))
                        return "eventTypeUrls: string[] expected";
            }
            if (message.customStatePrefixes != null && message.hasOwnProperty("customStatePrefixes")) {
                if (!Array.isArray(message.customStatePrefixes))
                    return "customStatePrefixes: array expected";
                for (var i = 0; i < message.customStatePrefixes.length; ++i)
                    if (!(message.customStatePrefixes[i] && typeof message.customStatePrefixes[i].length === "number" || $util.isString(message.customStatePrefixes[i])))
                        return "customStatePrefixes: buffer[] expected";
            }
            return null;
        };

        /**
         * Creates a PluginConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginConfig} PluginConfig
         */
        PluginConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginConfig)
                return object;
            var message = new $root.types.PluginConfig();
            if (object.name != null)
                message.name = String(object.name);
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.version != null)
                if ($util.Long)
                    (message.version = $util.Long.fromValue(object.version)).unsigned = true;
                else if (typeof object.version === "string")
                    message.version = parseInt(object.version, 10);
                else if (typeof object.version === "number")
                    message.version = object.version;
                else if (typeof object.version === "object")
                    message.version = new $util.LongBits(object.version.low >>> 0, object.version.high >>> 0).toNumber(true);
            if (object.supportedTransactions) {
                if (!Array.isArray(object.supportedTransactions))
                    throw TypeError(".types.PluginConfig.supportedTransactions: array expected");
                message.supportedTransactions = [];
                for (var i = 0; i < object.supportedTransactions.length; ++i)
                    message.supportedTransactions[i] = String(object.supportedTransactions[i]);
            }
            if (object.fileDescriptorProtos) {
                if (!Array.isArray(object.fileDescriptorProtos))
                    throw TypeError(".types.PluginConfig.fileDescriptorProtos: array expected");
                message.fileDescriptorProtos = [];
                for (var i = 0; i < object.fileDescriptorProtos.length; ++i)
                    if (typeof object.fileDescriptorProtos[i] === "string")
                        $util.base64.decode(object.fileDescriptorProtos[i], message.fileDescriptorProtos[i] = $util.newBuffer($util.base64.length(object.fileDescriptorProtos[i])), 0);
                    else if (object.fileDescriptorProtos[i].length >= 0)
                        message.fileDescriptorProtos[i] = object.fileDescriptorProtos[i];
            }
            if (object.transactionTypeUrls) {
                if (!Array.isArray(object.transactionTypeUrls))
                    throw TypeError(".types.PluginConfig.transactionTypeUrls: array expected");
                message.transactionTypeUrls = [];
                for (var i = 0; i < object.transactionTypeUrls.length; ++i)
                    message.transactionTypeUrls[i] = String(object.transactionTypeUrls[i]);
            }
            if (object.eventTypeUrls) {
                if (!Array.isArray(object.eventTypeUrls))
                    throw TypeError(".types.PluginConfig.eventTypeUrls: array expected");
                message.eventTypeUrls = [];
                for (var i = 0; i < object.eventTypeUrls.length; ++i)
                    message.eventTypeUrls[i] = String(object.eventTypeUrls[i]);
            }
            if (object.customStatePrefixes) {
                if (!Array.isArray(object.customStatePrefixes))
                    throw TypeError(".types.PluginConfig.customStatePrefixes: array expected");
                message.customStatePrefixes = [];
                for (var i = 0; i < object.customStatePrefixes.length; ++i)
                    if (typeof object.customStatePrefixes[i] === "string")
                        $util.base64.decode(object.customStatePrefixes[i], message.customStatePrefixes[i] = $util.newBuffer($util.base64.length(object.customStatePrefixes[i])), 0);
                    else if (object.customStatePrefixes[i].length >= 0)
                        message.customStatePrefixes[i] = object.customStatePrefixes[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginConfig
         * @static
         * @param {types.PluginConfig} message PluginConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.supportedTransactions = [];
                object.fileDescriptorProtos = [];
                object.transactionTypeUrls = [];
                object.eventTypeUrls = [];
                object.customStatePrefixes = [];
            }
            if (options.defaults) {
                object.name = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.version = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.version = options.longs === String ? "0" : 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.version != null && message.hasOwnProperty("version"))
                if (typeof message.version === "number")
                    object.version = options.longs === String ? String(message.version) : message.version;
                else
                    object.version = options.longs === String ? $util.Long.prototype.toString.call(message.version) : options.longs === Number ? new $util.LongBits(message.version.low >>> 0, message.version.high >>> 0).toNumber(true) : message.version;
            if (message.supportedTransactions && message.supportedTransactions.length) {
                object.supportedTransactions = [];
                for (var j = 0; j < message.supportedTransactions.length; ++j)
                    object.supportedTransactions[j] = message.supportedTransactions[j];
            }
            if (message.fileDescriptorProtos && message.fileDescriptorProtos.length) {
                object.fileDescriptorProtos = [];
                for (var j = 0; j < message.fileDescriptorProtos.length; ++j)
                    object.fileDescriptorProtos[j] = options.bytes === String ? $util.base64.encode(message.fileDescriptorProtos[j], 0, message.fileDescriptorProtos[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.fileDescriptorProtos[j]) : message.fileDescriptorProtos[j];
            }
            if (message.transactionTypeUrls && message.transactionTypeUrls.length) {
                object.transactionTypeUrls = [];
                for (var j = 0; j < message.transactionTypeUrls.length; ++j)
                    object.transactionTypeUrls[j] = message.transactionTypeUrls[j];
            }
            if (message.eventTypeUrls && message.eventTypeUrls.length) {
                object.eventTypeUrls = [];
                for (var j = 0; j < message.eventTypeUrls.length; ++j)
                    object.eventTypeUrls[j] = message.eventTypeUrls[j];
            }
            if (message.customStatePrefixes && message.customStatePrefixes.length) {
                object.customStatePrefixes = [];
                for (var j = 0; j < message.customStatePrefixes.length; ++j)
                    object.customStatePrefixes[j] = options.bytes === String ? $util.base64.encode(message.customStatePrefixes[j], 0, message.customStatePrefixes[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.customStatePrefixes[j]) : message.customStatePrefixes[j];
            }
            return object;
        };

        /**
         * Converts this PluginConfig to JSON.
         * @function toJSON
         * @memberof types.PluginConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginConfig
         * @function getTypeUrl
         * @memberof types.PluginConfig
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginConfig";
        };

        return PluginConfig;
    })();

    types.PluginFSMConfig = (function() {

        /**
         * Properties of a PluginFSMConfig.
         * @memberof types
         * @interface IPluginFSMConfig
         * @property {types.IPluginConfig|null} [config] PluginFSMConfig config
         */

        /**
         * Constructs a new PluginFSMConfig.
         * @memberof types
         * @classdesc Represents a PluginFSMConfig.
         * @implements IPluginFSMConfig
         * @constructor
         * @param {types.IPluginFSMConfig=} [properties] Properties to set
         */
        function PluginFSMConfig(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginFSMConfig config.
         * @member {types.IPluginConfig|null|undefined} config
         * @memberof types.PluginFSMConfig
         * @instance
         */
        PluginFSMConfig.prototype.config = null;

        /**
         * Creates a new PluginFSMConfig instance using the specified properties.
         * @function create
         * @memberof types.PluginFSMConfig
         * @static
         * @param {types.IPluginFSMConfig=} [properties] Properties to set
         * @returns {types.PluginFSMConfig} PluginFSMConfig instance
         */
        PluginFSMConfig.create = function create(properties) {
            return new PluginFSMConfig(properties);
        };

        /**
         * Encodes the specified PluginFSMConfig message. Does not implicitly {@link types.PluginFSMConfig.verify|verify} messages.
         * @function encode
         * @memberof types.PluginFSMConfig
         * @static
         * @param {types.IPluginFSMConfig} message PluginFSMConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginFSMConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                $root.types.PluginConfig.encode(message.config, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginFSMConfig message, length delimited. Does not implicitly {@link types.PluginFSMConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginFSMConfig
         * @static
         * @param {types.IPluginFSMConfig} message PluginFSMConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginFSMConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginFSMConfig message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginFSMConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginFSMConfig} PluginFSMConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginFSMConfig.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginFSMConfig();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.config = $root.types.PluginConfig.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginFSMConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginFSMConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginFSMConfig} PluginFSMConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginFSMConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginFSMConfig message.
         * @function verify
         * @memberof types.PluginFSMConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginFSMConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.config != null && message.hasOwnProperty("config")) {
                var error = $root.types.PluginConfig.verify(message.config);
                if (error)
                    return "config." + error;
            }
            return null;
        };

        /**
         * Creates a PluginFSMConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginFSMConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginFSMConfig} PluginFSMConfig
         */
        PluginFSMConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginFSMConfig)
                return object;
            var message = new $root.types.PluginFSMConfig();
            if (object.config != null) {
                if (typeof object.config !== "object")
                    throw TypeError(".types.PluginFSMConfig.config: object expected");
                message.config = $root.types.PluginConfig.fromObject(object.config);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginFSMConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginFSMConfig
         * @static
         * @param {types.PluginFSMConfig} message PluginFSMConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginFSMConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.config = null;
            if (message.config != null && message.hasOwnProperty("config"))
                object.config = $root.types.PluginConfig.toObject(message.config, options);
            return object;
        };

        /**
         * Converts this PluginFSMConfig to JSON.
         * @function toJSON
         * @memberof types.PluginFSMConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginFSMConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginFSMConfig
         * @function getTypeUrl
         * @memberof types.PluginFSMConfig
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginFSMConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginFSMConfig";
        };

        return PluginFSMConfig;
    })();

    types.PluginGenesisRequest = (function() {

        /**
         * Properties of a PluginGenesisRequest.
         * @memberof types
         * @interface IPluginGenesisRequest
         * @property {Uint8Array|null} [genesisJson] PluginGenesisRequest genesisJson
         */

        /**
         * Constructs a new PluginGenesisRequest.
         * @memberof types
         * @classdesc Represents a PluginGenesisRequest.
         * @implements IPluginGenesisRequest
         * @constructor
         * @param {types.IPluginGenesisRequest=} [properties] Properties to set
         */
        function PluginGenesisRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginGenesisRequest genesisJson.
         * @member {Uint8Array} genesisJson
         * @memberof types.PluginGenesisRequest
         * @instance
         */
        PluginGenesisRequest.prototype.genesisJson = $util.newBuffer([]);

        /**
         * Creates a new PluginGenesisRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {types.IPluginGenesisRequest=} [properties] Properties to set
         * @returns {types.PluginGenesisRequest} PluginGenesisRequest instance
         */
        PluginGenesisRequest.create = function create(properties) {
            return new PluginGenesisRequest(properties);
        };

        /**
         * Encodes the specified PluginGenesisRequest message. Does not implicitly {@link types.PluginGenesisRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {types.IPluginGenesisRequest} message PluginGenesisRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginGenesisRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.genesisJson != null && Object.hasOwnProperty.call(message, "genesisJson"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.genesisJson);
            return writer;
        };

        /**
         * Encodes the specified PluginGenesisRequest message, length delimited. Does not implicitly {@link types.PluginGenesisRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {types.IPluginGenesisRequest} message PluginGenesisRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginGenesisRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginGenesisRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginGenesisRequest} PluginGenesisRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginGenesisRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginGenesisRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.genesisJson = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginGenesisRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginGenesisRequest} PluginGenesisRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginGenesisRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginGenesisRequest message.
         * @function verify
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginGenesisRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.genesisJson != null && message.hasOwnProperty("genesisJson"))
                if (!(message.genesisJson && typeof message.genesisJson.length === "number" || $util.isString(message.genesisJson)))
                    return "genesisJson: buffer expected";
            return null;
        };

        /**
         * Creates a PluginGenesisRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginGenesisRequest} PluginGenesisRequest
         */
        PluginGenesisRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginGenesisRequest)
                return object;
            var message = new $root.types.PluginGenesisRequest();
            if (object.genesisJson != null)
                if (typeof object.genesisJson === "string")
                    $util.base64.decode(object.genesisJson, message.genesisJson = $util.newBuffer($util.base64.length(object.genesisJson)), 0);
                else if (object.genesisJson.length >= 0)
                    message.genesisJson = object.genesisJson;
            return message;
        };

        /**
         * Creates a plain object from a PluginGenesisRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {types.PluginGenesisRequest} message PluginGenesisRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginGenesisRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.genesisJson = "";
                else {
                    object.genesisJson = [];
                    if (options.bytes !== Array)
                        object.genesisJson = $util.newBuffer(object.genesisJson);
                }
            if (message.genesisJson != null && message.hasOwnProperty("genesisJson"))
                object.genesisJson = options.bytes === String ? $util.base64.encode(message.genesisJson, 0, message.genesisJson.length) : options.bytes === Array ? Array.prototype.slice.call(message.genesisJson) : message.genesisJson;
            return object;
        };

        /**
         * Converts this PluginGenesisRequest to JSON.
         * @function toJSON
         * @memberof types.PluginGenesisRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginGenesisRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginGenesisRequest
         * @function getTypeUrl
         * @memberof types.PluginGenesisRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginGenesisRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginGenesisRequest";
        };

        return PluginGenesisRequest;
    })();

    types.PluginGenesisResponse = (function() {

        /**
         * Properties of a PluginGenesisResponse.
         * @memberof types
         * @interface IPluginGenesisResponse
         * @property {types.IPluginError|null} [error] PluginGenesisResponse error
         */

        /**
         * Constructs a new PluginGenesisResponse.
         * @memberof types
         * @classdesc Represents a PluginGenesisResponse.
         * @implements IPluginGenesisResponse
         * @constructor
         * @param {types.IPluginGenesisResponse=} [properties] Properties to set
         */
        function PluginGenesisResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginGenesisResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginGenesisResponse
         * @instance
         */
        PluginGenesisResponse.prototype.error = null;

        /**
         * Creates a new PluginGenesisResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {types.IPluginGenesisResponse=} [properties] Properties to set
         * @returns {types.PluginGenesisResponse} PluginGenesisResponse instance
         */
        PluginGenesisResponse.create = function create(properties) {
            return new PluginGenesisResponse(properties);
        };

        /**
         * Encodes the specified PluginGenesisResponse message. Does not implicitly {@link types.PluginGenesisResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {types.IPluginGenesisResponse} message PluginGenesisResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginGenesisResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginGenesisResponse message, length delimited. Does not implicitly {@link types.PluginGenesisResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {types.IPluginGenesisResponse} message PluginGenesisResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginGenesisResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginGenesisResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginGenesisResponse} PluginGenesisResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginGenesisResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginGenesisResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginGenesisResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginGenesisResponse} PluginGenesisResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginGenesisResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginGenesisResponse message.
         * @function verify
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginGenesisResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error")) {
                var error = $root.types.PluginError.verify(message.error);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginGenesisResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginGenesisResponse} PluginGenesisResponse
         */
        PluginGenesisResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginGenesisResponse)
                return object;
            var message = new $root.types.PluginGenesisResponse();
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".types.PluginGenesisResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginGenesisResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {types.PluginGenesisResponse} message PluginGenesisResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginGenesisResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.error = null;
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.types.PluginError.toObject(message.error, options);
            return object;
        };

        /**
         * Converts this PluginGenesisResponse to JSON.
         * @function toJSON
         * @memberof types.PluginGenesisResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginGenesisResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginGenesisResponse
         * @function getTypeUrl
         * @memberof types.PluginGenesisResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginGenesisResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginGenesisResponse";
        };

        return PluginGenesisResponse;
    })();

    types.PluginBeginRequest = (function() {

        /**
         * Properties of a PluginBeginRequest.
         * @memberof types
         * @interface IPluginBeginRequest
         * @property {number|Long|null} [height] PluginBeginRequest height
         */

        /**
         * Constructs a new PluginBeginRequest.
         * @memberof types
         * @classdesc Represents a PluginBeginRequest.
         * @implements IPluginBeginRequest
         * @constructor
         * @param {types.IPluginBeginRequest=} [properties] Properties to set
         */
        function PluginBeginRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginBeginRequest height.
         * @member {number|Long} height
         * @memberof types.PluginBeginRequest
         * @instance
         */
        PluginBeginRequest.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new PluginBeginRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginBeginRequest
         * @static
         * @param {types.IPluginBeginRequest=} [properties] Properties to set
         * @returns {types.PluginBeginRequest} PluginBeginRequest instance
         */
        PluginBeginRequest.create = function create(properties) {
            return new PluginBeginRequest(properties);
        };

        /**
         * Encodes the specified PluginBeginRequest message. Does not implicitly {@link types.PluginBeginRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginBeginRequest
         * @static
         * @param {types.IPluginBeginRequest} message PluginBeginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginBeginRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.height);
            return writer;
        };

        /**
         * Encodes the specified PluginBeginRequest message, length delimited. Does not implicitly {@link types.PluginBeginRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginBeginRequest
         * @static
         * @param {types.IPluginBeginRequest} message PluginBeginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginBeginRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginBeginRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginBeginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginBeginRequest} PluginBeginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginBeginRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginBeginRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.height = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginBeginRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginBeginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginBeginRequest} PluginBeginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginBeginRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginBeginRequest message.
         * @function verify
         * @memberof types.PluginBeginRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginBeginRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            return null;
        };

        /**
         * Creates a PluginBeginRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginBeginRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginBeginRequest} PluginBeginRequest
         */
        PluginBeginRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginBeginRequest)
                return object;
            var message = new $root.types.PluginBeginRequest();
            if (object.height != null)
                if ($util.Long)
                    (message.height = $util.Long.fromValue(object.height)).unsigned = true;
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a PluginBeginRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginBeginRequest
         * @static
         * @param {types.PluginBeginRequest} message PluginBeginRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginBeginRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.height = options.longs === String ? "0" : 0;
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
            return object;
        };

        /**
         * Converts this PluginBeginRequest to JSON.
         * @function toJSON
         * @memberof types.PluginBeginRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginBeginRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginBeginRequest
         * @function getTypeUrl
         * @memberof types.PluginBeginRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginBeginRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginBeginRequest";
        };

        return PluginBeginRequest;
    })();

    types.PluginBeginResponse = (function() {

        /**
         * Properties of a PluginBeginResponse.
         * @memberof types
         * @interface IPluginBeginResponse
         * @property {Array.<types.IEvent>|null} [events] PluginBeginResponse events
         * @property {types.IPluginError|null} [error] PluginBeginResponse error
         */

        /**
         * Constructs a new PluginBeginResponse.
         * @memberof types
         * @classdesc Represents a PluginBeginResponse.
         * @implements IPluginBeginResponse
         * @constructor
         * @param {types.IPluginBeginResponse=} [properties] Properties to set
         */
        function PluginBeginResponse(properties) {
            this.events = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginBeginResponse events.
         * @member {Array.<types.IEvent>} events
         * @memberof types.PluginBeginResponse
         * @instance
         */
        PluginBeginResponse.prototype.events = $util.emptyArray;

        /**
         * PluginBeginResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginBeginResponse
         * @instance
         */
        PluginBeginResponse.prototype.error = null;

        /**
         * Creates a new PluginBeginResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginBeginResponse
         * @static
         * @param {types.IPluginBeginResponse=} [properties] Properties to set
         * @returns {types.PluginBeginResponse} PluginBeginResponse instance
         */
        PluginBeginResponse.create = function create(properties) {
            return new PluginBeginResponse(properties);
        };

        /**
         * Encodes the specified PluginBeginResponse message. Does not implicitly {@link types.PluginBeginResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginBeginResponse
         * @static
         * @param {types.IPluginBeginResponse} message PluginBeginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginBeginResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.events != null && message.events.length)
                for (var i = 0; i < message.events.length; ++i)
                    $root.types.Event.encode(message.events[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginBeginResponse message, length delimited. Does not implicitly {@link types.PluginBeginResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginBeginResponse
         * @static
         * @param {types.IPluginBeginResponse} message PluginBeginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginBeginResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginBeginResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginBeginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginBeginResponse} PluginBeginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginBeginResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginBeginResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.types.Event.decode(reader, reader.uint32()));
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginBeginResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginBeginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginBeginResponse} PluginBeginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginBeginResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginBeginResponse message.
         * @function verify
         * @memberof types.PluginBeginResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginBeginResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.events != null && message.hasOwnProperty("events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (var i = 0; i < message.events.length; ++i) {
                    var error = $root.types.Event.verify(message.events[i]);
                    if (error)
                        return "events." + error;
                }
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                var error = $root.types.PluginError.verify(message.error);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginBeginResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginBeginResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginBeginResponse} PluginBeginResponse
         */
        PluginBeginResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginBeginResponse)
                return object;
            var message = new $root.types.PluginBeginResponse();
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".types.PluginBeginResponse.events: array expected");
                message.events = [];
                for (var i = 0; i < object.events.length; ++i) {
                    if (typeof object.events[i] !== "object")
                        throw TypeError(".types.PluginBeginResponse.events: object expected");
                    message.events[i] = $root.types.Event.fromObject(object.events[i]);
                }
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".types.PluginBeginResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginBeginResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginBeginResponse
         * @static
         * @param {types.PluginBeginResponse} message PluginBeginResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginBeginResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.events = [];
            if (options.defaults)
                object.error = null;
            if (message.events && message.events.length) {
                object.events = [];
                for (var j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.types.Event.toObject(message.events[j], options);
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.types.PluginError.toObject(message.error, options);
            return object;
        };

        /**
         * Converts this PluginBeginResponse to JSON.
         * @function toJSON
         * @memberof types.PluginBeginResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginBeginResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginBeginResponse
         * @function getTypeUrl
         * @memberof types.PluginBeginResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginBeginResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginBeginResponse";
        };

        return PluginBeginResponse;
    })();

    types.PluginCheckRequest = (function() {

        /**
         * Properties of a PluginCheckRequest.
         * @memberof types
         * @interface IPluginCheckRequest
         * @property {types.ITransaction|null} [tx] PluginCheckRequest tx
         */

        /**
         * Constructs a new PluginCheckRequest.
         * @memberof types
         * @classdesc Represents a PluginCheckRequest.
         * @implements IPluginCheckRequest
         * @constructor
         * @param {types.IPluginCheckRequest=} [properties] Properties to set
         */
        function PluginCheckRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginCheckRequest tx.
         * @member {types.ITransaction|null|undefined} tx
         * @memberof types.PluginCheckRequest
         * @instance
         */
        PluginCheckRequest.prototype.tx = null;

        /**
         * Creates a new PluginCheckRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginCheckRequest
         * @static
         * @param {types.IPluginCheckRequest=} [properties] Properties to set
         * @returns {types.PluginCheckRequest} PluginCheckRequest instance
         */
        PluginCheckRequest.create = function create(properties) {
            return new PluginCheckRequest(properties);
        };

        /**
         * Encodes the specified PluginCheckRequest message. Does not implicitly {@link types.PluginCheckRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginCheckRequest
         * @static
         * @param {types.IPluginCheckRequest} message PluginCheckRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginCheckRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.tx != null && Object.hasOwnProperty.call(message, "tx"))
                $root.types.Transaction.encode(message.tx, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginCheckRequest message, length delimited. Does not implicitly {@link types.PluginCheckRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginCheckRequest
         * @static
         * @param {types.IPluginCheckRequest} message PluginCheckRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginCheckRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginCheckRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginCheckRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginCheckRequest} PluginCheckRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginCheckRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginCheckRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.tx = $root.types.Transaction.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginCheckRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginCheckRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginCheckRequest} PluginCheckRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginCheckRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginCheckRequest message.
         * @function verify
         * @memberof types.PluginCheckRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginCheckRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.tx != null && message.hasOwnProperty("tx")) {
                var error = $root.types.Transaction.verify(message.tx);
                if (error)
                    return "tx." + error;
            }
            return null;
        };

        /**
         * Creates a PluginCheckRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginCheckRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginCheckRequest} PluginCheckRequest
         */
        PluginCheckRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginCheckRequest)
                return object;
            var message = new $root.types.PluginCheckRequest();
            if (object.tx != null) {
                if (typeof object.tx !== "object")
                    throw TypeError(".types.PluginCheckRequest.tx: object expected");
                message.tx = $root.types.Transaction.fromObject(object.tx);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginCheckRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginCheckRequest
         * @static
         * @param {types.PluginCheckRequest} message PluginCheckRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginCheckRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.tx = null;
            if (message.tx != null && message.hasOwnProperty("tx"))
                object.tx = $root.types.Transaction.toObject(message.tx, options);
            return object;
        };

        /**
         * Converts this PluginCheckRequest to JSON.
         * @function toJSON
         * @memberof types.PluginCheckRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginCheckRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginCheckRequest
         * @function getTypeUrl
         * @memberof types.PluginCheckRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginCheckRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginCheckRequest";
        };

        return PluginCheckRequest;
    })();

    types.PluginCheckResponse = (function() {

        /**
         * Properties of a PluginCheckResponse.
         * @memberof types
         * @interface IPluginCheckResponse
         * @property {Array.<Uint8Array>|null} [authorizedSigners] PluginCheckResponse authorizedSigners
         * @property {Uint8Array|null} [recipient] PluginCheckResponse recipient
         * @property {types.IPluginError|null} [error] PluginCheckResponse error
         */

        /**
         * Constructs a new PluginCheckResponse.
         * @memberof types
         * @classdesc Represents a PluginCheckResponse.
         * @implements IPluginCheckResponse
         * @constructor
         * @param {types.IPluginCheckResponse=} [properties] Properties to set
         */
        function PluginCheckResponse(properties) {
            this.authorizedSigners = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginCheckResponse authorizedSigners.
         * @member {Array.<Uint8Array>} authorizedSigners
         * @memberof types.PluginCheckResponse
         * @instance
         */
        PluginCheckResponse.prototype.authorizedSigners = $util.emptyArray;

        /**
         * PluginCheckResponse recipient.
         * @member {Uint8Array} recipient
         * @memberof types.PluginCheckResponse
         * @instance
         */
        PluginCheckResponse.prototype.recipient = $util.newBuffer([]);

        /**
         * PluginCheckResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginCheckResponse
         * @instance
         */
        PluginCheckResponse.prototype.error = null;

        /**
         * Creates a new PluginCheckResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginCheckResponse
         * @static
         * @param {types.IPluginCheckResponse=} [properties] Properties to set
         * @returns {types.PluginCheckResponse} PluginCheckResponse instance
         */
        PluginCheckResponse.create = function create(properties) {
            return new PluginCheckResponse(properties);
        };

        /**
         * Encodes the specified PluginCheckResponse message. Does not implicitly {@link types.PluginCheckResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginCheckResponse
         * @static
         * @param {types.IPluginCheckResponse} message PluginCheckResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginCheckResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.authorizedSigners != null && message.authorizedSigners.length)
                for (var i = 0; i < message.authorizedSigners.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.authorizedSigners[i]);
            if (message.recipient != null && Object.hasOwnProperty.call(message, "recipient"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recipient);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginCheckResponse message, length delimited. Does not implicitly {@link types.PluginCheckResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginCheckResponse
         * @static
         * @param {types.IPluginCheckResponse} message PluginCheckResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginCheckResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginCheckResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginCheckResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginCheckResponse} PluginCheckResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginCheckResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginCheckResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.authorizedSigners && message.authorizedSigners.length))
                            message.authorizedSigners = [];
                        message.authorizedSigners.push(reader.bytes());
                        break;
                    }
                case 2: {
                        message.recipient = reader.bytes();
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginCheckResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginCheckResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginCheckResponse} PluginCheckResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginCheckResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginCheckResponse message.
         * @function verify
         * @memberof types.PluginCheckResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginCheckResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.authorizedSigners != null && message.hasOwnProperty("authorizedSigners")) {
                if (!Array.isArray(message.authorizedSigners))
                    return "authorizedSigners: array expected";
                for (var i = 0; i < message.authorizedSigners.length; ++i)
                    if (!(message.authorizedSigners[i] && typeof message.authorizedSigners[i].length === "number" || $util.isString(message.authorizedSigners[i])))
                        return "authorizedSigners: buffer[] expected";
            }
            if (message.recipient != null && message.hasOwnProperty("recipient"))
                if (!(message.recipient && typeof message.recipient.length === "number" || $util.isString(message.recipient)))
                    return "recipient: buffer expected";
            if (message.error != null && message.hasOwnProperty("error")) {
                var error = $root.types.PluginError.verify(message.error);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginCheckResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginCheckResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginCheckResponse} PluginCheckResponse
         */
        PluginCheckResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginCheckResponse)
                return object;
            var message = new $root.types.PluginCheckResponse();
            if (object.authorizedSigners) {
                if (!Array.isArray(object.authorizedSigners))
                    throw TypeError(".types.PluginCheckResponse.authorizedSigners: array expected");
                message.authorizedSigners = [];
                for (var i = 0; i < object.authorizedSigners.length; ++i)
                    if (typeof object.authorizedSigners[i] === "string")
                        $util.base64.decode(object.authorizedSigners[i], message.authorizedSigners[i] = $util.newBuffer($util.base64.length(object.authorizedSigners[i])), 0);
                    else if (object.authorizedSigners[i].length >= 0)
                        message.authorizedSigners[i] = object.authorizedSigners[i];
            }
            if (object.recipient != null)
                if (typeof object.recipient === "string")
                    $util.base64.decode(object.recipient, message.recipient = $util.newBuffer($util.base64.length(object.recipient)), 0);
                else if (object.recipient.length >= 0)
                    message.recipient = object.recipient;
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".types.PluginCheckResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginCheckResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginCheckResponse
         * @static
         * @param {types.PluginCheckResponse} message PluginCheckResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginCheckResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.authorizedSigners = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.recipient = "";
                else {
                    object.recipient = [];
                    if (options.bytes !== Array)
                        object.recipient = $util.newBuffer(object.recipient);
                }
                object.error = null;
            }
            if (message.authorizedSigners && message.authorizedSigners.length) {
                object.authorizedSigners = [];
                for (var j = 0; j < message.authorizedSigners.length; ++j)
                    object.authorizedSigners[j] = options.bytes === String ? $util.base64.encode(message.authorizedSigners[j], 0, message.authorizedSigners[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.authorizedSigners[j]) : message.authorizedSigners[j];
            }
            if (message.recipient != null && message.hasOwnProperty("recipient"))
                object.recipient = options.bytes === String ? $util.base64.encode(message.recipient, 0, message.recipient.length) : options.bytes === Array ? Array.prototype.slice.call(message.recipient) : message.recipient;
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.types.PluginError.toObject(message.error, options);
            return object;
        };

        /**
         * Converts this PluginCheckResponse to JSON.
         * @function toJSON
         * @memberof types.PluginCheckResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginCheckResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginCheckResponse
         * @function getTypeUrl
         * @memberof types.PluginCheckResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginCheckResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginCheckResponse";
        };

        return PluginCheckResponse;
    })();

    types.PluginDeliverRequest = (function() {

        /**
         * Properties of a PluginDeliverRequest.
         * @memberof types
         * @interface IPluginDeliverRequest
         * @property {types.ITransaction|null} [tx] PluginDeliverRequest tx
         */

        /**
         * Constructs a new PluginDeliverRequest.
         * @memberof types
         * @classdesc Represents a PluginDeliverRequest.
         * @implements IPluginDeliverRequest
         * @constructor
         * @param {types.IPluginDeliverRequest=} [properties] Properties to set
         */
        function PluginDeliverRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginDeliverRequest tx.
         * @member {types.ITransaction|null|undefined} tx
         * @memberof types.PluginDeliverRequest
         * @instance
         */
        PluginDeliverRequest.prototype.tx = null;

        /**
         * Creates a new PluginDeliverRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {types.IPluginDeliverRequest=} [properties] Properties to set
         * @returns {types.PluginDeliverRequest} PluginDeliverRequest instance
         */
        PluginDeliverRequest.create = function create(properties) {
            return new PluginDeliverRequest(properties);
        };

        /**
         * Encodes the specified PluginDeliverRequest message. Does not implicitly {@link types.PluginDeliverRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {types.IPluginDeliverRequest} message PluginDeliverRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeliverRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.tx != null && Object.hasOwnProperty.call(message, "tx"))
                $root.types.Transaction.encode(message.tx, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginDeliverRequest message, length delimited. Does not implicitly {@link types.PluginDeliverRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {types.IPluginDeliverRequest} message PluginDeliverRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeliverRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginDeliverRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginDeliverRequest} PluginDeliverRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeliverRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginDeliverRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.tx = $root.types.Transaction.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginDeliverRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginDeliverRequest} PluginDeliverRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeliverRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginDeliverRequest message.
         * @function verify
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginDeliverRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.tx != null && message.hasOwnProperty("tx")) {
                var error = $root.types.Transaction.verify(message.tx);
                if (error)
                    return "tx." + error;
            }
            return null;
        };

        /**
         * Creates a PluginDeliverRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginDeliverRequest} PluginDeliverRequest
         */
        PluginDeliverRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginDeliverRequest)
                return object;
            var message = new $root.types.PluginDeliverRequest();
            if (object.tx != null) {
                if (typeof object.tx !== "object")
                    throw TypeError(".types.PluginDeliverRequest.tx: object expected");
                message.tx = $root.types.Transaction.fromObject(object.tx);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginDeliverRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {types.PluginDeliverRequest} message PluginDeliverRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginDeliverRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.tx = null;
            if (message.tx != null && message.hasOwnProperty("tx"))
                object.tx = $root.types.Transaction.toObject(message.tx, options);
            return object;
        };

        /**
         * Converts this PluginDeliverRequest to JSON.
         * @function toJSON
         * @memberof types.PluginDeliverRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginDeliverRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginDeliverRequest
         * @function getTypeUrl
         * @memberof types.PluginDeliverRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginDeliverRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginDeliverRequest";
        };

        return PluginDeliverRequest;
    })();

    types.PluginDeliverResponse = (function() {

        /**
         * Properties of a PluginDeliverResponse.
         * @memberof types
         * @interface IPluginDeliverResponse
         * @property {Array.<types.IEvent>|null} [events] PluginDeliverResponse events
         * @property {types.IPluginError|null} [error] PluginDeliverResponse error
         */

        /**
         * Constructs a new PluginDeliverResponse.
         * @memberof types
         * @classdesc Represents a PluginDeliverResponse.
         * @implements IPluginDeliverResponse
         * @constructor
         * @param {types.IPluginDeliverResponse=} [properties] Properties to set
         */
        function PluginDeliverResponse(properties) {
            this.events = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginDeliverResponse events.
         * @member {Array.<types.IEvent>} events
         * @memberof types.PluginDeliverResponse
         * @instance
         */
        PluginDeliverResponse.prototype.events = $util.emptyArray;

        /**
         * PluginDeliverResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginDeliverResponse
         * @instance
         */
        PluginDeliverResponse.prototype.error = null;

        /**
         * Creates a new PluginDeliverResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {types.IPluginDeliverResponse=} [properties] Properties to set
         * @returns {types.PluginDeliverResponse} PluginDeliverResponse instance
         */
        PluginDeliverResponse.create = function create(properties) {
            return new PluginDeliverResponse(properties);
        };

        /**
         * Encodes the specified PluginDeliverResponse message. Does not implicitly {@link types.PluginDeliverResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {types.IPluginDeliverResponse} message PluginDeliverResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeliverResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.events != null && message.events.length)
                for (var i = 0; i < message.events.length; ++i)
                    $root.types.Event.encode(message.events[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginDeliverResponse message, length delimited. Does not implicitly {@link types.PluginDeliverResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {types.IPluginDeliverResponse} message PluginDeliverResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeliverResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginDeliverResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginDeliverResponse} PluginDeliverResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeliverResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginDeliverResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.types.Event.decode(reader, reader.uint32()));
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginDeliverResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginDeliverResponse} PluginDeliverResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeliverResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginDeliverResponse message.
         * @function verify
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginDeliverResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.events != null && message.hasOwnProperty("events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (var i = 0; i < message.events.length; ++i) {
                    var error = $root.types.Event.verify(message.events[i]);
                    if (error)
                        return "events." + error;
                }
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                var error = $root.types.PluginError.verify(message.error);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginDeliverResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginDeliverResponse} PluginDeliverResponse
         */
        PluginDeliverResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginDeliverResponse)
                return object;
            var message = new $root.types.PluginDeliverResponse();
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".types.PluginDeliverResponse.events: array expected");
                message.events = [];
                for (var i = 0; i < object.events.length; ++i) {
                    if (typeof object.events[i] !== "object")
                        throw TypeError(".types.PluginDeliverResponse.events: object expected");
                    message.events[i] = $root.types.Event.fromObject(object.events[i]);
                }
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".types.PluginDeliverResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginDeliverResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {types.PluginDeliverResponse} message PluginDeliverResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginDeliverResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.events = [];
            if (options.defaults)
                object.error = null;
            if (message.events && message.events.length) {
                object.events = [];
                for (var j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.types.Event.toObject(message.events[j], options);
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.types.PluginError.toObject(message.error, options);
            return object;
        };

        /**
         * Converts this PluginDeliverResponse to JSON.
         * @function toJSON
         * @memberof types.PluginDeliverResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginDeliverResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginDeliverResponse
         * @function getTypeUrl
         * @memberof types.PluginDeliverResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginDeliverResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginDeliverResponse";
        };

        return PluginDeliverResponse;
    })();

    types.PluginEndRequest = (function() {

        /**
         * Properties of a PluginEndRequest.
         * @memberof types
         * @interface IPluginEndRequest
         * @property {number|Long|null} [height] PluginEndRequest height
         * @property {Uint8Array|null} [proposerAddress] PluginEndRequest proposerAddress
         */

        /**
         * Constructs a new PluginEndRequest.
         * @memberof types
         * @classdesc Represents a PluginEndRequest.
         * @implements IPluginEndRequest
         * @constructor
         * @param {types.IPluginEndRequest=} [properties] Properties to set
         */
        function PluginEndRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginEndRequest height.
         * @member {number|Long} height
         * @memberof types.PluginEndRequest
         * @instance
         */
        PluginEndRequest.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginEndRequest proposerAddress.
         * @member {Uint8Array} proposerAddress
         * @memberof types.PluginEndRequest
         * @instance
         */
        PluginEndRequest.prototype.proposerAddress = $util.newBuffer([]);

        /**
         * Creates a new PluginEndRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginEndRequest
         * @static
         * @param {types.IPluginEndRequest=} [properties] Properties to set
         * @returns {types.PluginEndRequest} PluginEndRequest instance
         */
        PluginEndRequest.create = function create(properties) {
            return new PluginEndRequest(properties);
        };

        /**
         * Encodes the specified PluginEndRequest message. Does not implicitly {@link types.PluginEndRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginEndRequest
         * @static
         * @param {types.IPluginEndRequest} message PluginEndRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginEndRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.height);
            if (message.proposerAddress != null && Object.hasOwnProperty.call(message, "proposerAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.proposerAddress);
            return writer;
        };

        /**
         * Encodes the specified PluginEndRequest message, length delimited. Does not implicitly {@link types.PluginEndRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginEndRequest
         * @static
         * @param {types.IPluginEndRequest} message PluginEndRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginEndRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginEndRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginEndRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginEndRequest} PluginEndRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginEndRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginEndRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.height = reader.uint64();
                        break;
                    }
                case 2: {
                        message.proposerAddress = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginEndRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginEndRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginEndRequest} PluginEndRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginEndRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginEndRequest message.
         * @function verify
         * @memberof types.PluginEndRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginEndRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            if (message.proposerAddress != null && message.hasOwnProperty("proposerAddress"))
                if (!(message.proposerAddress && typeof message.proposerAddress.length === "number" || $util.isString(message.proposerAddress)))
                    return "proposerAddress: buffer expected";
            return null;
        };

        /**
         * Creates a PluginEndRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginEndRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginEndRequest} PluginEndRequest
         */
        PluginEndRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginEndRequest)
                return object;
            var message = new $root.types.PluginEndRequest();
            if (object.height != null)
                if ($util.Long)
                    (message.height = $util.Long.fromValue(object.height)).unsigned = true;
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
            if (object.proposerAddress != null)
                if (typeof object.proposerAddress === "string")
                    $util.base64.decode(object.proposerAddress, message.proposerAddress = $util.newBuffer($util.base64.length(object.proposerAddress)), 0);
                else if (object.proposerAddress.length >= 0)
                    message.proposerAddress = object.proposerAddress;
            return message;
        };

        /**
         * Creates a plain object from a PluginEndRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginEndRequest
         * @static
         * @param {types.PluginEndRequest} message PluginEndRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginEndRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.height = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.proposerAddress = "";
                else {
                    object.proposerAddress = [];
                    if (options.bytes !== Array)
                        object.proposerAddress = $util.newBuffer(object.proposerAddress);
                }
            }
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
            if (message.proposerAddress != null && message.hasOwnProperty("proposerAddress"))
                object.proposerAddress = options.bytes === String ? $util.base64.encode(message.proposerAddress, 0, message.proposerAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.proposerAddress) : message.proposerAddress;
            return object;
        };

        /**
         * Converts this PluginEndRequest to JSON.
         * @function toJSON
         * @memberof types.PluginEndRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginEndRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginEndRequest
         * @function getTypeUrl
         * @memberof types.PluginEndRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginEndRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginEndRequest";
        };

        return PluginEndRequest;
    })();

    types.PluginEndResponse = (function() {

        /**
         * Properties of a PluginEndResponse.
         * @memberof types
         * @interface IPluginEndResponse
         * @property {Array.<types.IEvent>|null} [events] PluginEndResponse events
         * @property {types.IPluginError|null} [error] PluginEndResponse error
         */

        /**
         * Constructs a new PluginEndResponse.
         * @memberof types
         * @classdesc Represents a PluginEndResponse.
         * @implements IPluginEndResponse
         * @constructor
         * @param {types.IPluginEndResponse=} [properties] Properties to set
         */
        function PluginEndResponse(properties) {
            this.events = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginEndResponse events.
         * @member {Array.<types.IEvent>} events
         * @memberof types.PluginEndResponse
         * @instance
         */
        PluginEndResponse.prototype.events = $util.emptyArray;

        /**
         * PluginEndResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginEndResponse
         * @instance
         */
        PluginEndResponse.prototype.error = null;

        /**
         * Creates a new PluginEndResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginEndResponse
         * @static
         * @param {types.IPluginEndResponse=} [properties] Properties to set
         * @returns {types.PluginEndResponse} PluginEndResponse instance
         */
        PluginEndResponse.create = function create(properties) {
            return new PluginEndResponse(properties);
        };

        /**
         * Encodes the specified PluginEndResponse message. Does not implicitly {@link types.PluginEndResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginEndResponse
         * @static
         * @param {types.IPluginEndResponse} message PluginEndResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginEndResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.events != null && message.events.length)
                for (var i = 0; i < message.events.length; ++i)
                    $root.types.Event.encode(message.events[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginEndResponse message, length delimited. Does not implicitly {@link types.PluginEndResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginEndResponse
         * @static
         * @param {types.IPluginEndResponse} message PluginEndResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginEndResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginEndResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginEndResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginEndResponse} PluginEndResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginEndResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginEndResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.types.Event.decode(reader, reader.uint32()));
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginEndResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginEndResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginEndResponse} PluginEndResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginEndResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginEndResponse message.
         * @function verify
         * @memberof types.PluginEndResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginEndResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.events != null && message.hasOwnProperty("events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (var i = 0; i < message.events.length; ++i) {
                    var error = $root.types.Event.verify(message.events[i]);
                    if (error)
                        return "events." + error;
                }
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                var error = $root.types.PluginError.verify(message.error);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginEndResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginEndResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginEndResponse} PluginEndResponse
         */
        PluginEndResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginEndResponse)
                return object;
            var message = new $root.types.PluginEndResponse();
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".types.PluginEndResponse.events: array expected");
                message.events = [];
                for (var i = 0; i < object.events.length; ++i) {
                    if (typeof object.events[i] !== "object")
                        throw TypeError(".types.PluginEndResponse.events: object expected");
                    message.events[i] = $root.types.Event.fromObject(object.events[i]);
                }
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".types.PluginEndResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginEndResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginEndResponse
         * @static
         * @param {types.PluginEndResponse} message PluginEndResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginEndResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.events = [];
            if (options.defaults)
                object.error = null;
            if (message.events && message.events.length) {
                object.events = [];
                for (var j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.types.Event.toObject(message.events[j], options);
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.types.PluginError.toObject(message.error, options);
            return object;
        };

        /**
         * Converts this PluginEndResponse to JSON.
         * @function toJSON
         * @memberof types.PluginEndResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginEndResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginEndResponse
         * @function getTypeUrl
         * @memberof types.PluginEndResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginEndResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginEndResponse";
        };

        return PluginEndResponse;
    })();

    types.PluginError = (function() {

        /**
         * Properties of a PluginError.
         * @memberof types
         * @interface IPluginError
         * @property {number|Long|null} [code] PluginError code
         * @property {string|null} [module] PluginError module
         * @property {string|null} [msg] PluginError msg
         */

        /**
         * Constructs a new PluginError.
         * @memberof types
         * @classdesc Represents a PluginError.
         * @implements IPluginError
         * @constructor
         * @param {types.IPluginError=} [properties] Properties to set
         */
        function PluginError(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginError code.
         * @member {number|Long} code
         * @memberof types.PluginError
         * @instance
         */
        PluginError.prototype.code = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginError module.
         * @member {string} module
         * @memberof types.PluginError
         * @instance
         */
        PluginError.prototype.module = "";

        /**
         * PluginError msg.
         * @member {string} msg
         * @memberof types.PluginError
         * @instance
         */
        PluginError.prototype.msg = "";

        /**
         * Creates a new PluginError instance using the specified properties.
         * @function create
         * @memberof types.PluginError
         * @static
         * @param {types.IPluginError=} [properties] Properties to set
         * @returns {types.PluginError} PluginError instance
         */
        PluginError.create = function create(properties) {
            return new PluginError(properties);
        };

        /**
         * Encodes the specified PluginError message. Does not implicitly {@link types.PluginError.verify|verify} messages.
         * @function encode
         * @memberof types.PluginError
         * @static
         * @param {types.IPluginError} message PluginError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginError.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.code);
            if (message.module != null && Object.hasOwnProperty.call(message, "module"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.module);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified PluginError message, length delimited. Does not implicitly {@link types.PluginError.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginError
         * @static
         * @param {types.IPluginError} message PluginError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginError.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginError message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginError} PluginError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginError.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginError();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.code = reader.uint64();
                        break;
                    }
                case 2: {
                        message.module = reader.string();
                        break;
                    }
                case 3: {
                        message.msg = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginError message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginError} PluginError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginError.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginError message.
         * @function verify
         * @memberof types.PluginError
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginError.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code) && !(message.code && $util.isInteger(message.code.low) && $util.isInteger(message.code.high)))
                    return "code: integer|Long expected";
            if (message.module != null && message.hasOwnProperty("module"))
                if (!$util.isString(message.module))
                    return "module: string expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a PluginError message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginError
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginError} PluginError
         */
        PluginError.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginError)
                return object;
            var message = new $root.types.PluginError();
            if (object.code != null)
                if ($util.Long)
                    (message.code = $util.Long.fromValue(object.code)).unsigned = true;
                else if (typeof object.code === "string")
                    message.code = parseInt(object.code, 10);
                else if (typeof object.code === "number")
                    message.code = object.code;
                else if (typeof object.code === "object")
                    message.code = new $util.LongBits(object.code.low >>> 0, object.code.high >>> 0).toNumber(true);
            if (object.module != null)
                message.module = String(object.module);
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a PluginError message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginError
         * @static
         * @param {types.PluginError} message PluginError
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginError.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.code = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.code = options.longs === String ? "0" : 0;
                object.module = "";
                object.msg = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                if (typeof message.code === "number")
                    object.code = options.longs === String ? String(message.code) : message.code;
                else
                    object.code = options.longs === String ? $util.Long.prototype.toString.call(message.code) : options.longs === Number ? new $util.LongBits(message.code.low >>> 0, message.code.high >>> 0).toNumber(true) : message.code;
            if (message.module != null && message.hasOwnProperty("module"))
                object.module = message.module;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this PluginError to JSON.
         * @function toJSON
         * @memberof types.PluginError
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginError.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginError
         * @function getTypeUrl
         * @memberof types.PluginError
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginError.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginError";
        };

        return PluginError;
    })();

    types.PluginQueryRequest = (function() {

        /**
         * Properties of a PluginQueryRequest.
         * @memberof types
         * @interface IPluginQueryRequest
         * @property {number|Long|null} [height] PluginQueryRequest height
         * @property {types.IPluginStateReadRequest|null} [read] PluginQueryRequest read
         */

        /**
         * Constructs a new PluginQueryRequest.
         * @memberof types
         * @classdesc Represents a PluginQueryRequest.
         * @implements IPluginQueryRequest
         * @constructor
         * @param {types.IPluginQueryRequest=} [properties] Properties to set
         */
        function PluginQueryRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginQueryRequest height.
         * @member {number|Long} height
         * @memberof types.PluginQueryRequest
         * @instance
         */
        PluginQueryRequest.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginQueryRequest read.
         * @member {types.IPluginStateReadRequest|null|undefined} read
         * @memberof types.PluginQueryRequest
         * @instance
         */
        PluginQueryRequest.prototype.read = null;

        /**
         * Creates a new PluginQueryRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginQueryRequest
         * @static
         * @param {types.IPluginQueryRequest=} [properties] Properties to set
         * @returns {types.PluginQueryRequest} PluginQueryRequest instance
         */
        PluginQueryRequest.create = function create(properties) {
            return new PluginQueryRequest(properties);
        };

        /**
         * Encodes the specified PluginQueryRequest message. Does not implicitly {@link types.PluginQueryRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginQueryRequest
         * @static
         * @param {types.IPluginQueryRequest} message PluginQueryRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginQueryRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.height);
            if (message.read != null && Object.hasOwnProperty.call(message, "read"))
                $root.types.PluginStateReadRequest.encode(message.read, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginQueryRequest message, length delimited. Does not implicitly {@link types.PluginQueryRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginQueryRequest
         * @static
         * @param {types.IPluginQueryRequest} message PluginQueryRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginQueryRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginQueryRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginQueryRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginQueryRequest} PluginQueryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginQueryRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginQueryRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.height = reader.uint64();
                        break;
                    }
                case 2: {
                        message.read = $root.types.PluginStateReadRequest.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginQueryRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginQueryRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginQueryRequest} PluginQueryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginQueryRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginQueryRequest message.
         * @function verify
         * @memberof types.PluginQueryRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginQueryRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            if (message.read != null && message.hasOwnProperty("read")) {
                var error = $root.types.PluginStateReadRequest.verify(message.read);
                if (error)
                    return "read." + error;
            }
            return null;
        };

        /**
         * Creates a PluginQueryRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginQueryRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginQueryRequest} PluginQueryRequest
         */
        PluginQueryRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginQueryRequest)
                return object;
            var message = new $root.types.PluginQueryRequest();
            if (object.height != null)
                if ($util.Long)
                    (message.height = $util.Long.fromValue(object.height)).unsigned = true;
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
            if (object.read != null) {
                if (typeof object.read !== "object")
                    throw TypeError(".types.PluginQueryRequest.read: object expected");
                message.read = $root.types.PluginStateReadRequest.fromObject(object.read);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginQueryRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginQueryRequest
         * @static
         * @param {types.PluginQueryRequest} message PluginQueryRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginQueryRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.height = options.longs === String ? "0" : 0;
                object.read = null;
            }
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
            if (message.read != null && message.hasOwnProperty("read"))
                object.read = $root.types.PluginStateReadRequest.toObject(message.read, options);
            return object;
        };

        /**
         * Converts this PluginQueryRequest to JSON.
         * @function toJSON
         * @memberof types.PluginQueryRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginQueryRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginQueryRequest
         * @function getTypeUrl
         * @memberof types.PluginQueryRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginQueryRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginQueryRequest";
        };

        return PluginQueryRequest;
    })();

    types.PluginQueryResponse = (function() {

        /**
         * Properties of a PluginQueryResponse.
         * @memberof types
         * @interface IPluginQueryResponse
         * @property {types.IPluginStateReadResponse|null} [read] PluginQueryResponse read
         * @property {types.IPluginError|null} [error] PluginQueryResponse error
         */

        /**
         * Constructs a new PluginQueryResponse.
         * @memberof types
         * @classdesc Represents a PluginQueryResponse.
         * @implements IPluginQueryResponse
         * @constructor
         * @param {types.IPluginQueryResponse=} [properties] Properties to set
         */
        function PluginQueryResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginQueryResponse read.
         * @member {types.IPluginStateReadResponse|null|undefined} read
         * @memberof types.PluginQueryResponse
         * @instance
         */
        PluginQueryResponse.prototype.read = null;

        /**
         * PluginQueryResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginQueryResponse
         * @instance
         */
        PluginQueryResponse.prototype.error = null;

        /**
         * Creates a new PluginQueryResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginQueryResponse
         * @static
         * @param {types.IPluginQueryResponse=} [properties] Properties to set
         * @returns {types.PluginQueryResponse} PluginQueryResponse instance
         */
        PluginQueryResponse.create = function create(properties) {
            return new PluginQueryResponse(properties);
        };

        /**
         * Encodes the specified PluginQueryResponse message. Does not implicitly {@link types.PluginQueryResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginQueryResponse
         * @static
         * @param {types.IPluginQueryResponse} message PluginQueryResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginQueryResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.read != null && Object.hasOwnProperty.call(message, "read"))
                $root.types.PluginStateReadResponse.encode(message.read, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginQueryResponse message, length delimited. Does not implicitly {@link types.PluginQueryResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginQueryResponse
         * @static
         * @param {types.IPluginQueryResponse} message PluginQueryResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginQueryResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginQueryResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginQueryResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginQueryResponse} PluginQueryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginQueryResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginQueryResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.read = $root.types.PluginStateReadResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginQueryResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginQueryResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginQueryResponse} PluginQueryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginQueryResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginQueryResponse message.
         * @function verify
         * @memberof types.PluginQueryResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginQueryResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.read != null && message.hasOwnProperty("read")) {
                var error = $root.types.PluginStateReadResponse.verify(message.read);
                if (error)
                    return "read." + error;
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                var error = $root.types.PluginError.verify(message.error);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginQueryResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginQueryResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginQueryResponse} PluginQueryResponse
         */
        PluginQueryResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginQueryResponse)
                return object;
            var message = new $root.types.PluginQueryResponse();
            if (object.read != null) {
                if (typeof object.read !== "object")
                    throw TypeError(".types.PluginQueryResponse.read: object expected");
                message.read = $root.types.PluginStateReadResponse.fromObject(object.read);
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".types.PluginQueryResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginQueryResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginQueryResponse
         * @static
         * @param {types.PluginQueryResponse} message PluginQueryResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginQueryResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.read = null;
                object.error = null;
            }
            if (message.read != null && message.hasOwnProperty("read"))
                object.read = $root.types.PluginStateReadResponse.toObject(message.read, options);
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.types.PluginError.toObject(message.error, options);
            return object;
        };

        /**
         * Converts this PluginQueryResponse to JSON.
         * @function toJSON
         * @memberof types.PluginQueryResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginQueryResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginQueryResponse
         * @function getTypeUrl
         * @memberof types.PluginQueryResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginQueryResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginQueryResponse";
        };

        return PluginQueryResponse;
    })();

    types.PluginStateReadRequest = (function() {

        /**
         * Properties of a PluginStateReadRequest.
         * @memberof types
         * @interface IPluginStateReadRequest
         * @property {Array.<types.IPluginKeyRead>|null} [keys] PluginStateReadRequest keys
         * @property {Array.<types.IPluginRangeRead>|null} [ranges] PluginStateReadRequest ranges
         */

        /**
         * Constructs a new PluginStateReadRequest.
         * @memberof types
         * @classdesc Represents a PluginStateReadRequest.
         * @implements IPluginStateReadRequest
         * @constructor
         * @param {types.IPluginStateReadRequest=} [properties] Properties to set
         */
        function PluginStateReadRequest(properties) {
            this.keys = [];
            this.ranges = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginStateReadRequest keys.
         * @member {Array.<types.IPluginKeyRead>} keys
         * @memberof types.PluginStateReadRequest
         * @instance
         */
        PluginStateReadRequest.prototype.keys = $util.emptyArray;

        /**
         * PluginStateReadRequest ranges.
         * @member {Array.<types.IPluginRangeRead>} ranges
         * @memberof types.PluginStateReadRequest
         * @instance
         */
        PluginStateReadRequest.prototype.ranges = $util.emptyArray;

        /**
         * Creates a new PluginStateReadRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {types.IPluginStateReadRequest=} [properties] Properties to set
         * @returns {types.PluginStateReadRequest} PluginStateReadRequest instance
         */
        PluginStateReadRequest.create = function create(properties) {
            return new PluginStateReadRequest(properties);
        };

        /**
         * Encodes the specified PluginStateReadRequest message. Does not implicitly {@link types.PluginStateReadRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {types.IPluginStateReadRequest} message PluginStateReadRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateReadRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.keys != null && message.keys.length)
                for (var i = 0; i < message.keys.length; ++i)
                    $root.types.PluginKeyRead.encode(message.keys[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.ranges != null && message.ranges.length)
                for (var i = 0; i < message.ranges.length; ++i)
                    $root.types.PluginRangeRead.encode(message.ranges[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginStateReadRequest message, length delimited. Does not implicitly {@link types.PluginStateReadRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {types.IPluginStateReadRequest} message PluginStateReadRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateReadRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginStateReadRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginStateReadRequest} PluginStateReadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateReadRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginStateReadRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.keys && message.keys.length))
                            message.keys = [];
                        message.keys.push($root.types.PluginKeyRead.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        if (!(message.ranges && message.ranges.length))
                            message.ranges = [];
                        message.ranges.push($root.types.PluginRangeRead.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginStateReadRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginStateReadRequest} PluginStateReadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateReadRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginStateReadRequest message.
         * @function verify
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginStateReadRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.keys != null && message.hasOwnProperty("keys")) {
                if (!Array.isArray(message.keys))
                    return "keys: array expected";
                for (var i = 0; i < message.keys.length; ++i) {
                    var error = $root.types.PluginKeyRead.verify(message.keys[i]);
                    if (error)
                        return "keys." + error;
                }
            }
            if (message.ranges != null && message.hasOwnProperty("ranges")) {
                if (!Array.isArray(message.ranges))
                    return "ranges: array expected";
                for (var i = 0; i < message.ranges.length; ++i) {
                    var error = $root.types.PluginRangeRead.verify(message.ranges[i]);
                    if (error)
                        return "ranges." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PluginStateReadRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginStateReadRequest} PluginStateReadRequest
         */
        PluginStateReadRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginStateReadRequest)
                return object;
            var message = new $root.types.PluginStateReadRequest();
            if (object.keys) {
                if (!Array.isArray(object.keys))
                    throw TypeError(".types.PluginStateReadRequest.keys: array expected");
                message.keys = [];
                for (var i = 0; i < object.keys.length; ++i) {
                    if (typeof object.keys[i] !== "object")
                        throw TypeError(".types.PluginStateReadRequest.keys: object expected");
                    message.keys[i] = $root.types.PluginKeyRead.fromObject(object.keys[i]);
                }
            }
            if (object.ranges) {
                if (!Array.isArray(object.ranges))
                    throw TypeError(".types.PluginStateReadRequest.ranges: array expected");
                message.ranges = [];
                for (var i = 0; i < object.ranges.length; ++i) {
                    if (typeof object.ranges[i] !== "object")
                        throw TypeError(".types.PluginStateReadRequest.ranges: object expected");
                    message.ranges[i] = $root.types.PluginRangeRead.fromObject(object.ranges[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginStateReadRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {types.PluginStateReadRequest} message PluginStateReadRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginStateReadRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.keys = [];
                object.ranges = [];
            }
            if (message.keys && message.keys.length) {
                object.keys = [];
                for (var j = 0; j < message.keys.length; ++j)
                    object.keys[j] = $root.types.PluginKeyRead.toObject(message.keys[j], options);
            }
            if (message.ranges && message.ranges.length) {
                object.ranges = [];
                for (var j = 0; j < message.ranges.length; ++j)
                    object.ranges[j] = $root.types.PluginRangeRead.toObject(message.ranges[j], options);
            }
            return object;
        };

        /**
         * Converts this PluginStateReadRequest to JSON.
         * @function toJSON
         * @memberof types.PluginStateReadRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginStateReadRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginStateReadRequest
         * @function getTypeUrl
         * @memberof types.PluginStateReadRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginStateReadRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginStateReadRequest";
        };

        return PluginStateReadRequest;
    })();

    types.PluginKeyRead = (function() {

        /**
         * Properties of a PluginKeyRead.
         * @memberof types
         * @interface IPluginKeyRead
         * @property {number|Long|null} [queryId] PluginKeyRead queryId
         * @property {Uint8Array|null} [key] PluginKeyRead key
         */

        /**
         * Constructs a new PluginKeyRead.
         * @memberof types
         * @classdesc Represents a PluginKeyRead.
         * @implements IPluginKeyRead
         * @constructor
         * @param {types.IPluginKeyRead=} [properties] Properties to set
         */
        function PluginKeyRead(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginKeyRead queryId.
         * @member {number|Long} queryId
         * @memberof types.PluginKeyRead
         * @instance
         */
        PluginKeyRead.prototype.queryId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginKeyRead key.
         * @member {Uint8Array} key
         * @memberof types.PluginKeyRead
         * @instance
         */
        PluginKeyRead.prototype.key = $util.newBuffer([]);

        /**
         * Creates a new PluginKeyRead instance using the specified properties.
         * @function create
         * @memberof types.PluginKeyRead
         * @static
         * @param {types.IPluginKeyRead=} [properties] Properties to set
         * @returns {types.PluginKeyRead} PluginKeyRead instance
         */
        PluginKeyRead.create = function create(properties) {
            return new PluginKeyRead(properties);
        };

        /**
         * Encodes the specified PluginKeyRead message. Does not implicitly {@link types.PluginKeyRead.verify|verify} messages.
         * @function encode
         * @memberof types.PluginKeyRead
         * @static
         * @param {types.IPluginKeyRead} message PluginKeyRead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginKeyRead.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.queryId);
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.key);
            return writer;
        };

        /**
         * Encodes the specified PluginKeyRead message, length delimited. Does not implicitly {@link types.PluginKeyRead.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginKeyRead
         * @static
         * @param {types.IPluginKeyRead} message PluginKeyRead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginKeyRead.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginKeyRead message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginKeyRead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginKeyRead} PluginKeyRead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginKeyRead.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginKeyRead();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.queryId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.key = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginKeyRead message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginKeyRead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginKeyRead} PluginKeyRead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginKeyRead.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginKeyRead message.
         * @function verify
         * @memberof types.PluginKeyRead
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginKeyRead.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.queryId != null && message.hasOwnProperty("queryId"))
                if (!$util.isInteger(message.queryId) && !(message.queryId && $util.isInteger(message.queryId.low) && $util.isInteger(message.queryId.high)))
                    return "queryId: integer|Long expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            return null;
        };

        /**
         * Creates a PluginKeyRead message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginKeyRead
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginKeyRead} PluginKeyRead
         */
        PluginKeyRead.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginKeyRead)
                return object;
            var message = new $root.types.PluginKeyRead();
            if (object.queryId != null)
                if ($util.Long)
                    (message.queryId = $util.Long.fromValue(object.queryId)).unsigned = true;
                else if (typeof object.queryId === "string")
                    message.queryId = parseInt(object.queryId, 10);
                else if (typeof object.queryId === "number")
                    message.queryId = object.queryId;
                else if (typeof object.queryId === "object")
                    message.queryId = new $util.LongBits(object.queryId.low >>> 0, object.queryId.high >>> 0).toNumber(true);
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            return message;
        };

        /**
         * Creates a plain object from a PluginKeyRead message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginKeyRead
         * @static
         * @param {types.PluginKeyRead} message PluginKeyRead
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginKeyRead.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.queryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.queryId = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
            }
            if (message.queryId != null && message.hasOwnProperty("queryId"))
                if (typeof message.queryId === "number")
                    object.queryId = options.longs === String ? String(message.queryId) : message.queryId;
                else
                    object.queryId = options.longs === String ? $util.Long.prototype.toString.call(message.queryId) : options.longs === Number ? new $util.LongBits(message.queryId.low >>> 0, message.queryId.high >>> 0).toNumber(true) : message.queryId;
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            return object;
        };

        /**
         * Converts this PluginKeyRead to JSON.
         * @function toJSON
         * @memberof types.PluginKeyRead
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginKeyRead.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginKeyRead
         * @function getTypeUrl
         * @memberof types.PluginKeyRead
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginKeyRead.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginKeyRead";
        };

        return PluginKeyRead;
    })();

    types.PluginRangeRead = (function() {

        /**
         * Properties of a PluginRangeRead.
         * @memberof types
         * @interface IPluginRangeRead
         * @property {number|Long|null} [queryId] PluginRangeRead queryId
         * @property {Uint8Array|null} [prefix] PluginRangeRead prefix
         * @property {number|Long|null} [limit] PluginRangeRead limit
         * @property {boolean|null} [reverse] PluginRangeRead reverse
         */

        /**
         * Constructs a new PluginRangeRead.
         * @memberof types
         * @classdesc Represents a PluginRangeRead.
         * @implements IPluginRangeRead
         * @constructor
         * @param {types.IPluginRangeRead=} [properties] Properties to set
         */
        function PluginRangeRead(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginRangeRead queryId.
         * @member {number|Long} queryId
         * @memberof types.PluginRangeRead
         * @instance
         */
        PluginRangeRead.prototype.queryId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginRangeRead prefix.
         * @member {Uint8Array} prefix
         * @memberof types.PluginRangeRead
         * @instance
         */
        PluginRangeRead.prototype.prefix = $util.newBuffer([]);

        /**
         * PluginRangeRead limit.
         * @member {number|Long} limit
         * @memberof types.PluginRangeRead
         * @instance
         */
        PluginRangeRead.prototype.limit = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginRangeRead reverse.
         * @member {boolean} reverse
         * @memberof types.PluginRangeRead
         * @instance
         */
        PluginRangeRead.prototype.reverse = false;

        /**
         * Creates a new PluginRangeRead instance using the specified properties.
         * @function create
         * @memberof types.PluginRangeRead
         * @static
         * @param {types.IPluginRangeRead=} [properties] Properties to set
         * @returns {types.PluginRangeRead} PluginRangeRead instance
         */
        PluginRangeRead.create = function create(properties) {
            return new PluginRangeRead(properties);
        };

        /**
         * Encodes the specified PluginRangeRead message. Does not implicitly {@link types.PluginRangeRead.verify|verify} messages.
         * @function encode
         * @memberof types.PluginRangeRead
         * @static
         * @param {types.IPluginRangeRead} message PluginRangeRead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginRangeRead.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.queryId);
            if (message.prefix != null && Object.hasOwnProperty.call(message, "prefix"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.prefix);
            if (message.limit != null && Object.hasOwnProperty.call(message, "limit"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.limit);
            if (message.reverse != null && Object.hasOwnProperty.call(message, "reverse"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.reverse);
            return writer;
        };

        /**
         * Encodes the specified PluginRangeRead message, length delimited. Does not implicitly {@link types.PluginRangeRead.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginRangeRead
         * @static
         * @param {types.IPluginRangeRead} message PluginRangeRead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginRangeRead.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginRangeRead message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginRangeRead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginRangeRead} PluginRangeRead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginRangeRead.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginRangeRead();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.queryId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.prefix = reader.bytes();
                        break;
                    }
                case 3: {
                        message.limit = reader.uint64();
                        break;
                    }
                case 4: {
                        message.reverse = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginRangeRead message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginRangeRead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginRangeRead} PluginRangeRead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginRangeRead.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginRangeRead message.
         * @function verify
         * @memberof types.PluginRangeRead
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginRangeRead.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.queryId != null && message.hasOwnProperty("queryId"))
                if (!$util.isInteger(message.queryId) && !(message.queryId && $util.isInteger(message.queryId.low) && $util.isInteger(message.queryId.high)))
                    return "queryId: integer|Long expected";
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                if (!(message.prefix && typeof message.prefix.length === "number" || $util.isString(message.prefix)))
                    return "prefix: buffer expected";
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (!$util.isInteger(message.limit) && !(message.limit && $util.isInteger(message.limit.low) && $util.isInteger(message.limit.high)))
                    return "limit: integer|Long expected";
            if (message.reverse != null && message.hasOwnProperty("reverse"))
                if (typeof message.reverse !== "boolean")
                    return "reverse: boolean expected";
            return null;
        };

        /**
         * Creates a PluginRangeRead message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginRangeRead
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginRangeRead} PluginRangeRead
         */
        PluginRangeRead.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginRangeRead)
                return object;
            var message = new $root.types.PluginRangeRead();
            if (object.queryId != null)
                if ($util.Long)
                    (message.queryId = $util.Long.fromValue(object.queryId)).unsigned = true;
                else if (typeof object.queryId === "string")
                    message.queryId = parseInt(object.queryId, 10);
                else if (typeof object.queryId === "number")
                    message.queryId = object.queryId;
                else if (typeof object.queryId === "object")
                    message.queryId = new $util.LongBits(object.queryId.low >>> 0, object.queryId.high >>> 0).toNumber(true);
            if (object.prefix != null)
                if (typeof object.prefix === "string")
                    $util.base64.decode(object.prefix, message.prefix = $util.newBuffer($util.base64.length(object.prefix)), 0);
                else if (object.prefix.length >= 0)
                    message.prefix = object.prefix;
            if (object.limit != null)
                if ($util.Long)
                    (message.limit = $util.Long.fromValue(object.limit)).unsigned = true;
                else if (typeof object.limit === "string")
                    message.limit = parseInt(object.limit, 10);
                else if (typeof object.limit === "number")
                    message.limit = object.limit;
                else if (typeof object.limit === "object")
                    message.limit = new $util.LongBits(object.limit.low >>> 0, object.limit.high >>> 0).toNumber(true);
            if (object.reverse != null)
                message.reverse = Boolean(object.reverse);
            return message;
        };

        /**
         * Creates a plain object from a PluginRangeRead message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginRangeRead
         * @static
         * @param {types.PluginRangeRead} message PluginRangeRead
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginRangeRead.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.queryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.queryId = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.prefix = "";
                else {
                    object.prefix = [];
                    if (options.bytes !== Array)
                        object.prefix = $util.newBuffer(object.prefix);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.limit = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.limit = options.longs === String ? "0" : 0;
                object.reverse = false;
            }
            if (message.queryId != null && message.hasOwnProperty("queryId"))
                if (typeof message.queryId === "number")
                    object.queryId = options.longs === String ? String(message.queryId) : message.queryId;
                else
                    object.queryId = options.longs === String ? $util.Long.prototype.toString.call(message.queryId) : options.longs === Number ? new $util.LongBits(message.queryId.low >>> 0, message.queryId.high >>> 0).toNumber(true) : message.queryId;
            if (message.prefix != null && message.hasOwnProperty("prefix"))
                object.prefix = options.bytes === String ? $util.base64.encode(message.prefix, 0, message.prefix.length) : options.bytes === Array ? Array.prototype.slice.call(message.prefix) : message.prefix;
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (typeof message.limit === "number")
                    object.limit = options.longs === String ? String(message.limit) : message.limit;
                else
                    object.limit = options.longs === String ? $util.Long.prototype.toString.call(message.limit) : options.longs === Number ? new $util.LongBits(message.limit.low >>> 0, message.limit.high >>> 0).toNumber(true) : message.limit;
            if (message.reverse != null && message.hasOwnProperty("reverse"))
                object.reverse = message.reverse;
            return object;
        };

        /**
         * Converts this PluginRangeRead to JSON.
         * @function toJSON
         * @memberof types.PluginRangeRead
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginRangeRead.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginRangeRead
         * @function getTypeUrl
         * @memberof types.PluginRangeRead
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginRangeRead.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginRangeRead";
        };

        return PluginRangeRead;
    })();

    types.PluginStateReadResponse = (function() {

        /**
         * Properties of a PluginStateReadResponse.
         * @memberof types
         * @interface IPluginStateReadResponse
         * @property {Array.<types.IPluginReadResult>|null} [results] PluginStateReadResponse results
         * @property {types.IPluginError|null} [error] PluginStateReadResponse error
         */

        /**
         * Constructs a new PluginStateReadResponse.
         * @memberof types
         * @classdesc Represents a PluginStateReadResponse.
         * @implements IPluginStateReadResponse
         * @constructor
         * @param {types.IPluginStateReadResponse=} [properties] Properties to set
         */
        function PluginStateReadResponse(properties) {
            this.results = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginStateReadResponse results.
         * @member {Array.<types.IPluginReadResult>} results
         * @memberof types.PluginStateReadResponse
         * @instance
         */
        PluginStateReadResponse.prototype.results = $util.emptyArray;

        /**
         * PluginStateReadResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginStateReadResponse
         * @instance
         */
        PluginStateReadResponse.prototype.error = null;

        /**
         * Creates a new PluginStateReadResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {types.IPluginStateReadResponse=} [properties] Properties to set
         * @returns {types.PluginStateReadResponse} PluginStateReadResponse instance
         */
        PluginStateReadResponse.create = function create(properties) {
            return new PluginStateReadResponse(properties);
        };

        /**
         * Encodes the specified PluginStateReadResponse message. Does not implicitly {@link types.PluginStateReadResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {types.IPluginStateReadResponse} message PluginStateReadResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateReadResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.results != null && message.results.length)
                for (var i = 0; i < message.results.length; ++i)
                    $root.types.PluginReadResult.encode(message.results[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginStateReadResponse message, length delimited. Does not implicitly {@link types.PluginStateReadResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {types.IPluginStateReadResponse} message PluginStateReadResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateReadResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginStateReadResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginStateReadResponse} PluginStateReadResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateReadResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginStateReadResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.results && message.results.length))
                            message.results = [];
                        message.results.push($root.types.PluginReadResult.decode(reader, reader.uint32()));
                        break;
                    }
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginStateReadResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginStateReadResponse} PluginStateReadResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateReadResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginStateReadResponse message.
         * @function verify
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginStateReadResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.results != null && message.hasOwnProperty("results")) {
                if (!Array.isArray(message.results))
                    return "results: array expected";
                for (var i = 0; i < message.results.length; ++i) {
                    var error = $root.types.PluginReadResult.verify(message.results[i]);
                    if (error)
                        return "results." + error;
                }
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                var error = $root.types.PluginError.verify(message.error);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginStateReadResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginStateReadResponse} PluginStateReadResponse
         */
        PluginStateReadResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginStateReadResponse)
                return object;
            var message = new $root.types.PluginStateReadResponse();
            if (object.results) {
                if (!Array.isArray(object.results))
                    throw TypeError(".types.PluginStateReadResponse.results: array expected");
                message.results = [];
                for (var i = 0; i < object.results.length; ++i) {
                    if (typeof object.results[i] !== "object")
                        throw TypeError(".types.PluginStateReadResponse.results: object expected");
                    message.results[i] = $root.types.PluginReadResult.fromObject(object.results[i]);
                }
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".types.PluginStateReadResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginStateReadResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {types.PluginStateReadResponse} message PluginStateReadResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginStateReadResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.results = [];
            if (options.defaults)
                object.error = null;
            if (message.results && message.results.length) {
                object.results = [];
                for (var j = 0; j < message.results.length; ++j)
                    object.results[j] = $root.types.PluginReadResult.toObject(message.results[j], options);
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.types.PluginError.toObject(message.error, options);
            return object;
        };

        /**
         * Converts this PluginStateReadResponse to JSON.
         * @function toJSON
         * @memberof types.PluginStateReadResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginStateReadResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginStateReadResponse
         * @function getTypeUrl
         * @memberof types.PluginStateReadResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginStateReadResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginStateReadResponse";
        };

        return PluginStateReadResponse;
    })();

    types.PluginReadResult = (function() {

        /**
         * Properties of a PluginReadResult.
         * @memberof types
         * @interface IPluginReadResult
         * @property {number|Long|null} [queryId] PluginReadResult queryId
         * @property {Array.<types.IPluginStateEntry>|null} [entries] PluginReadResult entries
         */

        /**
         * Constructs a new PluginReadResult.
         * @memberof types
         * @classdesc Represents a PluginReadResult.
         * @implements IPluginReadResult
         * @constructor
         * @param {types.IPluginReadResult=} [properties] Properties to set
         */
        function PluginReadResult(properties) {
            this.entries = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginReadResult queryId.
         * @member {number|Long} queryId
         * @memberof types.PluginReadResult
         * @instance
         */
        PluginReadResult.prototype.queryId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * PluginReadResult entries.
         * @member {Array.<types.IPluginStateEntry>} entries
         * @memberof types.PluginReadResult
         * @instance
         */
        PluginReadResult.prototype.entries = $util.emptyArray;

        /**
         * Creates a new PluginReadResult instance using the specified properties.
         * @function create
         * @memberof types.PluginReadResult
         * @static
         * @param {types.IPluginReadResult=} [properties] Properties to set
         * @returns {types.PluginReadResult} PluginReadResult instance
         */
        PluginReadResult.create = function create(properties) {
            return new PluginReadResult(properties);
        };

        /**
         * Encodes the specified PluginReadResult message. Does not implicitly {@link types.PluginReadResult.verify|verify} messages.
         * @function encode
         * @memberof types.PluginReadResult
         * @static
         * @param {types.IPluginReadResult} message PluginReadResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginReadResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.queryId != null && Object.hasOwnProperty.call(message, "queryId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.queryId);
            if (message.entries != null && message.entries.length)
                for (var i = 0; i < message.entries.length; ++i)
                    $root.types.PluginStateEntry.encode(message.entries[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginReadResult message, length delimited. Does not implicitly {@link types.PluginReadResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginReadResult
         * @static
         * @param {types.IPluginReadResult} message PluginReadResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginReadResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginReadResult message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginReadResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginReadResult} PluginReadResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginReadResult.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginReadResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.queryId = reader.uint64();
                        break;
                    }
                case 2: {
                        if (!(message.entries && message.entries.length))
                            message.entries = [];
                        message.entries.push($root.types.PluginStateEntry.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginReadResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginReadResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginReadResult} PluginReadResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginReadResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginReadResult message.
         * @function verify
         * @memberof types.PluginReadResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginReadResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.queryId != null && message.hasOwnProperty("queryId"))
                if (!$util.isInteger(message.queryId) && !(message.queryId && $util.isInteger(message.queryId.low) && $util.isInteger(message.queryId.high)))
                    return "queryId: integer|Long expected";
            if (message.entries != null && message.hasOwnProperty("entries")) {
                if (!Array.isArray(message.entries))
                    return "entries: array expected";
                for (var i = 0; i < message.entries.length; ++i) {
                    var error = $root.types.PluginStateEntry.verify(message.entries[i]);
                    if (error)
                        return "entries." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PluginReadResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginReadResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginReadResult} PluginReadResult
         */
        PluginReadResult.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginReadResult)
                return object;
            var message = new $root.types.PluginReadResult();
            if (object.queryId != null)
                if ($util.Long)
                    (message.queryId = $util.Long.fromValue(object.queryId)).unsigned = true;
                else if (typeof object.queryId === "string")
                    message.queryId = parseInt(object.queryId, 10);
                else if (typeof object.queryId === "number")
                    message.queryId = object.queryId;
                else if (typeof object.queryId === "object")
                    message.queryId = new $util.LongBits(object.queryId.low >>> 0, object.queryId.high >>> 0).toNumber(true);
            if (object.entries) {
                if (!Array.isArray(object.entries))
                    throw TypeError(".types.PluginReadResult.entries: array expected");
                message.entries = [];
                for (var i = 0; i < object.entries.length; ++i) {
                    if (typeof object.entries[i] !== "object")
                        throw TypeError(".types.PluginReadResult.entries: object expected");
                    message.entries[i] = $root.types.PluginStateEntry.fromObject(object.entries[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginReadResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginReadResult
         * @static
         * @param {types.PluginReadResult} message PluginReadResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginReadResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.entries = [];
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.queryId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.queryId = options.longs === String ? "0" : 0;
            if (message.queryId != null && message.hasOwnProperty("queryId"))
                if (typeof message.queryId === "number")
                    object.queryId = options.longs === String ? String(message.queryId) : message.queryId;
                else
                    object.queryId = options.longs === String ? $util.Long.prototype.toString.call(message.queryId) : options.longs === Number ? new $util.LongBits(message.queryId.low >>> 0, message.queryId.high >>> 0).toNumber(true) : message.queryId;
            if (message.entries && message.entries.length) {
                object.entries = [];
                for (var j = 0; j < message.entries.length; ++j)
                    object.entries[j] = $root.types.PluginStateEntry.toObject(message.entries[j], options);
            }
            return object;
        };

        /**
         * Converts this PluginReadResult to JSON.
         * @function toJSON
         * @memberof types.PluginReadResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginReadResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginReadResult
         * @function getTypeUrl
         * @memberof types.PluginReadResult
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginReadResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginReadResult";
        };

        return PluginReadResult;
    })();

    types.PluginStateWriteRequest = (function() {

        /**
         * Properties of a PluginStateWriteRequest.
         * @memberof types
         * @interface IPluginStateWriteRequest
         * @property {Array.<types.IPluginSetOp>|null} [sets] PluginStateWriteRequest sets
         * @property {Array.<types.IPluginDeleteOp>|null} [deletes] PluginStateWriteRequest deletes
         */

        /**
         * Constructs a new PluginStateWriteRequest.
         * @memberof types
         * @classdesc Represents a PluginStateWriteRequest.
         * @implements IPluginStateWriteRequest
         * @constructor
         * @param {types.IPluginStateWriteRequest=} [properties] Properties to set
         */
        function PluginStateWriteRequest(properties) {
            this.sets = [];
            this.deletes = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginStateWriteRequest sets.
         * @member {Array.<types.IPluginSetOp>} sets
         * @memberof types.PluginStateWriteRequest
         * @instance
         */
        PluginStateWriteRequest.prototype.sets = $util.emptyArray;

        /**
         * PluginStateWriteRequest deletes.
         * @member {Array.<types.IPluginDeleteOp>} deletes
         * @memberof types.PluginStateWriteRequest
         * @instance
         */
        PluginStateWriteRequest.prototype.deletes = $util.emptyArray;

        /**
         * Creates a new PluginStateWriteRequest instance using the specified properties.
         * @function create
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {types.IPluginStateWriteRequest=} [properties] Properties to set
         * @returns {types.PluginStateWriteRequest} PluginStateWriteRequest instance
         */
        PluginStateWriteRequest.create = function create(properties) {
            return new PluginStateWriteRequest(properties);
        };

        /**
         * Encodes the specified PluginStateWriteRequest message. Does not implicitly {@link types.PluginStateWriteRequest.verify|verify} messages.
         * @function encode
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {types.IPluginStateWriteRequest} message PluginStateWriteRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateWriteRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sets != null && message.sets.length)
                for (var i = 0; i < message.sets.length; ++i)
                    $root.types.PluginSetOp.encode(message.sets[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.deletes != null && message.deletes.length)
                for (var i = 0; i < message.deletes.length; ++i)
                    $root.types.PluginDeleteOp.encode(message.deletes[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginStateWriteRequest message, length delimited. Does not implicitly {@link types.PluginStateWriteRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {types.IPluginStateWriteRequest} message PluginStateWriteRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateWriteRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginStateWriteRequest message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginStateWriteRequest} PluginStateWriteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateWriteRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginStateWriteRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.sets && message.sets.length))
                            message.sets = [];
                        message.sets.push($root.types.PluginSetOp.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        if (!(message.deletes && message.deletes.length))
                            message.deletes = [];
                        message.deletes.push($root.types.PluginDeleteOp.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginStateWriteRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginStateWriteRequest} PluginStateWriteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateWriteRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginStateWriteRequest message.
         * @function verify
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginStateWriteRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sets != null && message.hasOwnProperty("sets")) {
                if (!Array.isArray(message.sets))
                    return "sets: array expected";
                for (var i = 0; i < message.sets.length; ++i) {
                    var error = $root.types.PluginSetOp.verify(message.sets[i]);
                    if (error)
                        return "sets." + error;
                }
            }
            if (message.deletes != null && message.hasOwnProperty("deletes")) {
                if (!Array.isArray(message.deletes))
                    return "deletes: array expected";
                for (var i = 0; i < message.deletes.length; ++i) {
                    var error = $root.types.PluginDeleteOp.verify(message.deletes[i]);
                    if (error)
                        return "deletes." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PluginStateWriteRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginStateWriteRequest} PluginStateWriteRequest
         */
        PluginStateWriteRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginStateWriteRequest)
                return object;
            var message = new $root.types.PluginStateWriteRequest();
            if (object.sets) {
                if (!Array.isArray(object.sets))
                    throw TypeError(".types.PluginStateWriteRequest.sets: array expected");
                message.sets = [];
                for (var i = 0; i < object.sets.length; ++i) {
                    if (typeof object.sets[i] !== "object")
                        throw TypeError(".types.PluginStateWriteRequest.sets: object expected");
                    message.sets[i] = $root.types.PluginSetOp.fromObject(object.sets[i]);
                }
            }
            if (object.deletes) {
                if (!Array.isArray(object.deletes))
                    throw TypeError(".types.PluginStateWriteRequest.deletes: array expected");
                message.deletes = [];
                for (var i = 0; i < object.deletes.length; ++i) {
                    if (typeof object.deletes[i] !== "object")
                        throw TypeError(".types.PluginStateWriteRequest.deletes: object expected");
                    message.deletes[i] = $root.types.PluginDeleteOp.fromObject(object.deletes[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginStateWriteRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {types.PluginStateWriteRequest} message PluginStateWriteRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginStateWriteRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.sets = [];
                object.deletes = [];
            }
            if (message.sets && message.sets.length) {
                object.sets = [];
                for (var j = 0; j < message.sets.length; ++j)
                    object.sets[j] = $root.types.PluginSetOp.toObject(message.sets[j], options);
            }
            if (message.deletes && message.deletes.length) {
                object.deletes = [];
                for (var j = 0; j < message.deletes.length; ++j)
                    object.deletes[j] = $root.types.PluginDeleteOp.toObject(message.deletes[j], options);
            }
            return object;
        };

        /**
         * Converts this PluginStateWriteRequest to JSON.
         * @function toJSON
         * @memberof types.PluginStateWriteRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginStateWriteRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginStateWriteRequest
         * @function getTypeUrl
         * @memberof types.PluginStateWriteRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginStateWriteRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginStateWriteRequest";
        };

        return PluginStateWriteRequest;
    })();

    types.PluginStateWriteResponse = (function() {

        /**
         * Properties of a PluginStateWriteResponse.
         * @memberof types
         * @interface IPluginStateWriteResponse
         * @property {types.IPluginError|null} [error] PluginStateWriteResponse error
         */

        /**
         * Constructs a new PluginStateWriteResponse.
         * @memberof types
         * @classdesc Represents a PluginStateWriteResponse.
         * @implements IPluginStateWriteResponse
         * @constructor
         * @param {types.IPluginStateWriteResponse=} [properties] Properties to set
         */
        function PluginStateWriteResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginStateWriteResponse error.
         * @member {types.IPluginError|null|undefined} error
         * @memberof types.PluginStateWriteResponse
         * @instance
         */
        PluginStateWriteResponse.prototype.error = null;

        /**
         * Creates a new PluginStateWriteResponse instance using the specified properties.
         * @function create
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {types.IPluginStateWriteResponse=} [properties] Properties to set
         * @returns {types.PluginStateWriteResponse} PluginStateWriteResponse instance
         */
        PluginStateWriteResponse.create = function create(properties) {
            return new PluginStateWriteResponse(properties);
        };

        /**
         * Encodes the specified PluginStateWriteResponse message. Does not implicitly {@link types.PluginStateWriteResponse.verify|verify} messages.
         * @function encode
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {types.IPluginStateWriteResponse} message PluginStateWriteResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateWriteResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.types.PluginError.encode(message.error, writer.uint32(/* id 99, wireType 2 =*/794).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PluginStateWriteResponse message, length delimited. Does not implicitly {@link types.PluginStateWriteResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {types.IPluginStateWriteResponse} message PluginStateWriteResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateWriteResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginStateWriteResponse message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginStateWriteResponse} PluginStateWriteResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateWriteResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginStateWriteResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 99: {
                        message.error = $root.types.PluginError.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginStateWriteResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginStateWriteResponse} PluginStateWriteResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateWriteResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginStateWriteResponse message.
         * @function verify
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginStateWriteResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error")) {
                var error = $root.types.PluginError.verify(message.error);
                if (error)
                    return "error." + error;
            }
            return null;
        };

        /**
         * Creates a PluginStateWriteResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginStateWriteResponse} PluginStateWriteResponse
         */
        PluginStateWriteResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginStateWriteResponse)
                return object;
            var message = new $root.types.PluginStateWriteResponse();
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".types.PluginStateWriteResponse.error: object expected");
                message.error = $root.types.PluginError.fromObject(object.error);
            }
            return message;
        };

        /**
         * Creates a plain object from a PluginStateWriteResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {types.PluginStateWriteResponse} message PluginStateWriteResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginStateWriteResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.error = null;
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.types.PluginError.toObject(message.error, options);
            return object;
        };

        /**
         * Converts this PluginStateWriteResponse to JSON.
         * @function toJSON
         * @memberof types.PluginStateWriteResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginStateWriteResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginStateWriteResponse
         * @function getTypeUrl
         * @memberof types.PluginStateWriteResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginStateWriteResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginStateWriteResponse";
        };

        return PluginStateWriteResponse;
    })();

    types.PluginSetOp = (function() {

        /**
         * Properties of a PluginSetOp.
         * @memberof types
         * @interface IPluginSetOp
         * @property {Uint8Array|null} [key] PluginSetOp key
         * @property {Uint8Array|null} [value] PluginSetOp value
         */

        /**
         * Constructs a new PluginSetOp.
         * @memberof types
         * @classdesc Represents a PluginSetOp.
         * @implements IPluginSetOp
         * @constructor
         * @param {types.IPluginSetOp=} [properties] Properties to set
         */
        function PluginSetOp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginSetOp key.
         * @member {Uint8Array} key
         * @memberof types.PluginSetOp
         * @instance
         */
        PluginSetOp.prototype.key = $util.newBuffer([]);

        /**
         * PluginSetOp value.
         * @member {Uint8Array} value
         * @memberof types.PluginSetOp
         * @instance
         */
        PluginSetOp.prototype.value = $util.newBuffer([]);

        /**
         * Creates a new PluginSetOp instance using the specified properties.
         * @function create
         * @memberof types.PluginSetOp
         * @static
         * @param {types.IPluginSetOp=} [properties] Properties to set
         * @returns {types.PluginSetOp} PluginSetOp instance
         */
        PluginSetOp.create = function create(properties) {
            return new PluginSetOp(properties);
        };

        /**
         * Encodes the specified PluginSetOp message. Does not implicitly {@link types.PluginSetOp.verify|verify} messages.
         * @function encode
         * @memberof types.PluginSetOp
         * @static
         * @param {types.IPluginSetOp} message PluginSetOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginSetOp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            return writer;
        };

        /**
         * Encodes the specified PluginSetOp message, length delimited. Does not implicitly {@link types.PluginSetOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginSetOp
         * @static
         * @param {types.IPluginSetOp} message PluginSetOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginSetOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginSetOp message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginSetOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginSetOp} PluginSetOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginSetOp.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginSetOp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.bytes();
                        break;
                    }
                case 2: {
                        message.value = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginSetOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginSetOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginSetOp} PluginSetOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginSetOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginSetOp message.
         * @function verify
         * @memberof types.PluginSetOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginSetOp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            return null;
        };

        /**
         * Creates a PluginSetOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginSetOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginSetOp} PluginSetOp
         */
        PluginSetOp.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginSetOp)
                return object;
            var message = new $root.types.PluginSetOp();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length >= 0)
                    message.value = object.value;
            return message;
        };

        /**
         * Creates a plain object from a PluginSetOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginSetOp
         * @static
         * @param {types.PluginSetOp} message PluginSetOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginSetOp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            return object;
        };

        /**
         * Converts this PluginSetOp to JSON.
         * @function toJSON
         * @memberof types.PluginSetOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginSetOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginSetOp
         * @function getTypeUrl
         * @memberof types.PluginSetOp
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginSetOp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginSetOp";
        };

        return PluginSetOp;
    })();

    types.PluginDeleteOp = (function() {

        /**
         * Properties of a PluginDeleteOp.
         * @memberof types
         * @interface IPluginDeleteOp
         * @property {Uint8Array|null} [key] PluginDeleteOp key
         */

        /**
         * Constructs a new PluginDeleteOp.
         * @memberof types
         * @classdesc Represents a PluginDeleteOp.
         * @implements IPluginDeleteOp
         * @constructor
         * @param {types.IPluginDeleteOp=} [properties] Properties to set
         */
        function PluginDeleteOp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginDeleteOp key.
         * @member {Uint8Array} key
         * @memberof types.PluginDeleteOp
         * @instance
         */
        PluginDeleteOp.prototype.key = $util.newBuffer([]);

        /**
         * Creates a new PluginDeleteOp instance using the specified properties.
         * @function create
         * @memberof types.PluginDeleteOp
         * @static
         * @param {types.IPluginDeleteOp=} [properties] Properties to set
         * @returns {types.PluginDeleteOp} PluginDeleteOp instance
         */
        PluginDeleteOp.create = function create(properties) {
            return new PluginDeleteOp(properties);
        };

        /**
         * Encodes the specified PluginDeleteOp message. Does not implicitly {@link types.PluginDeleteOp.verify|verify} messages.
         * @function encode
         * @memberof types.PluginDeleteOp
         * @static
         * @param {types.IPluginDeleteOp} message PluginDeleteOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeleteOp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            return writer;
        };

        /**
         * Encodes the specified PluginDeleteOp message, length delimited. Does not implicitly {@link types.PluginDeleteOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginDeleteOp
         * @static
         * @param {types.IPluginDeleteOp} message PluginDeleteOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginDeleteOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginDeleteOp message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginDeleteOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginDeleteOp} PluginDeleteOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeleteOp.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginDeleteOp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginDeleteOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginDeleteOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginDeleteOp} PluginDeleteOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginDeleteOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginDeleteOp message.
         * @function verify
         * @memberof types.PluginDeleteOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginDeleteOp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            return null;
        };

        /**
         * Creates a PluginDeleteOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginDeleteOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginDeleteOp} PluginDeleteOp
         */
        PluginDeleteOp.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginDeleteOp)
                return object;
            var message = new $root.types.PluginDeleteOp();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            return message;
        };

        /**
         * Creates a plain object from a PluginDeleteOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginDeleteOp
         * @static
         * @param {types.PluginDeleteOp} message PluginDeleteOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginDeleteOp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            return object;
        };

        /**
         * Converts this PluginDeleteOp to JSON.
         * @function toJSON
         * @memberof types.PluginDeleteOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginDeleteOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginDeleteOp
         * @function getTypeUrl
         * @memberof types.PluginDeleteOp
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginDeleteOp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginDeleteOp";
        };

        return PluginDeleteOp;
    })();

    types.PluginStateEntry = (function() {

        /**
         * Properties of a PluginStateEntry.
         * @memberof types
         * @interface IPluginStateEntry
         * @property {Uint8Array|null} [key] PluginStateEntry key
         * @property {Uint8Array|null} [value] PluginStateEntry value
         */

        /**
         * Constructs a new PluginStateEntry.
         * @memberof types
         * @classdesc Represents a PluginStateEntry.
         * @implements IPluginStateEntry
         * @constructor
         * @param {types.IPluginStateEntry=} [properties] Properties to set
         */
        function PluginStateEntry(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PluginStateEntry key.
         * @member {Uint8Array} key
         * @memberof types.PluginStateEntry
         * @instance
         */
        PluginStateEntry.prototype.key = $util.newBuffer([]);

        /**
         * PluginStateEntry value.
         * @member {Uint8Array} value
         * @memberof types.PluginStateEntry
         * @instance
         */
        PluginStateEntry.prototype.value = $util.newBuffer([]);

        /**
         * Creates a new PluginStateEntry instance using the specified properties.
         * @function create
         * @memberof types.PluginStateEntry
         * @static
         * @param {types.IPluginStateEntry=} [properties] Properties to set
         * @returns {types.PluginStateEntry} PluginStateEntry instance
         */
        PluginStateEntry.create = function create(properties) {
            return new PluginStateEntry(properties);
        };

        /**
         * Encodes the specified PluginStateEntry message. Does not implicitly {@link types.PluginStateEntry.verify|verify} messages.
         * @function encode
         * @memberof types.PluginStateEntry
         * @static
         * @param {types.IPluginStateEntry} message PluginStateEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateEntry.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            return writer;
        };

        /**
         * Encodes the specified PluginStateEntry message, length delimited. Does not implicitly {@link types.PluginStateEntry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.PluginStateEntry
         * @static
         * @param {types.IPluginStateEntry} message PluginStateEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PluginStateEntry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PluginStateEntry message from the specified reader or buffer.
         * @function decode
         * @memberof types.PluginStateEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.PluginStateEntry} PluginStateEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateEntry.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.PluginStateEntry();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.bytes();
                        break;
                    }
                case 2: {
                        message.value = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PluginStateEntry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.PluginStateEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.PluginStateEntry} PluginStateEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PluginStateEntry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PluginStateEntry message.
         * @function verify
         * @memberof types.PluginStateEntry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PluginStateEntry.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            return null;
        };

        /**
         * Creates a PluginStateEntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.PluginStateEntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.PluginStateEntry} PluginStateEntry
         */
        PluginStateEntry.fromObject = function fromObject(object) {
            if (object instanceof $root.types.PluginStateEntry)
                return object;
            var message = new $root.types.PluginStateEntry();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length >= 0)
                    message.value = object.value;
            return message;
        };

        /**
         * Creates a plain object from a PluginStateEntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.PluginStateEntry
         * @static
         * @param {types.PluginStateEntry} message PluginStateEntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PluginStateEntry.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            return object;
        };

        /**
         * Converts this PluginStateEntry to JSON.
         * @function toJSON
         * @memberof types.PluginStateEntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PluginStateEntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PluginStateEntry
         * @function getTypeUrl
         * @memberof types.PluginStateEntry
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PluginStateEntry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.PluginStateEntry";
        };

        return PluginStateEntry;
    })();

    types.Transaction = (function() {

        /**
         * Properties of a Transaction.
         * @memberof types
         * @interface ITransaction
         * @property {string|null} [messageType] Transaction messageType
         * @property {google.protobuf.IAny|null} [msg] Transaction msg
         * @property {types.ISignature|null} [signature] Transaction signature
         * @property {number|Long|null} [createdHeight] Transaction createdHeight
         * @property {number|Long|null} [time] Transaction time
         * @property {number|Long|null} [fee] Transaction fee
         * @property {string|null} [memo] Transaction memo
         * @property {number|Long|null} [networkId] Transaction networkId
         * @property {number|Long|null} [chainId] Transaction chainId
         */

        /**
         * Constructs a new Transaction.
         * @memberof types
         * @classdesc Represents a Transaction.
         * @implements ITransaction
         * @constructor
         * @param {types.ITransaction=} [properties] Properties to set
         */
        function Transaction(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Transaction messageType.
         * @member {string} messageType
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.messageType = "";

        /**
         * Transaction msg.
         * @member {google.protobuf.IAny|null|undefined} msg
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.msg = null;

        /**
         * Transaction signature.
         * @member {types.ISignature|null|undefined} signature
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.signature = null;

        /**
         * Transaction createdHeight.
         * @member {number|Long} createdHeight
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.createdHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Transaction time.
         * @member {number|Long} time
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Transaction fee.
         * @member {number|Long} fee
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.fee = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Transaction memo.
         * @member {string} memo
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.memo = "";

        /**
         * Transaction networkId.
         * @member {number|Long} networkId
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.networkId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Transaction chainId.
         * @member {number|Long} chainId
         * @memberof types.Transaction
         * @instance
         */
        Transaction.prototype.chainId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Transaction instance using the specified properties.
         * @function create
         * @memberof types.Transaction
         * @static
         * @param {types.ITransaction=} [properties] Properties to set
         * @returns {types.Transaction} Transaction instance
         */
        Transaction.create = function create(properties) {
            return new Transaction(properties);
        };

        /**
         * Encodes the specified Transaction message. Does not implicitly {@link types.Transaction.verify|verify} messages.
         * @function encode
         * @memberof types.Transaction
         * @static
         * @param {types.ITransaction} message Transaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transaction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.messageType);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                $root.google.protobuf.Any.encode(message.msg, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                $root.types.Signature.encode(message.signature, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.createdHeight != null && Object.hasOwnProperty.call(message, "createdHeight"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.createdHeight);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.time);
            if (message.fee != null && Object.hasOwnProperty.call(message, "fee"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.fee);
            if (message.memo != null && Object.hasOwnProperty.call(message, "memo"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.memo);
            if (message.networkId != null && Object.hasOwnProperty.call(message, "networkId"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.networkId);
            if (message.chainId != null && Object.hasOwnProperty.call(message, "chainId"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint64(message.chainId);
            return writer;
        };

        /**
         * Encodes the specified Transaction message, length delimited. Does not implicitly {@link types.Transaction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Transaction
         * @static
         * @param {types.ITransaction} message Transaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transaction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Transaction message from the specified reader or buffer.
         * @function decode
         * @memberof types.Transaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Transaction} Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transaction.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Transaction();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.messageType = reader.string();
                        break;
                    }
                case 2: {
                        message.msg = $root.google.protobuf.Any.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.signature = $root.types.Signature.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.createdHeight = reader.uint64();
                        break;
                    }
                case 5: {
                        message.time = reader.uint64();
                        break;
                    }
                case 6: {
                        message.fee = reader.uint64();
                        break;
                    }
                case 7: {
                        message.memo = reader.string();
                        break;
                    }
                case 8: {
                        message.networkId = reader.uint64();
                        break;
                    }
                case 9: {
                        message.chainId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Transaction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Transaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Transaction} Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transaction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Transaction message.
         * @function verify
         * @memberof types.Transaction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Transaction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.messageType != null && message.hasOwnProperty("messageType"))
                if (!$util.isString(message.messageType))
                    return "messageType: string expected";
            if (message.msg != null && message.hasOwnProperty("msg")) {
                var error = $root.google.protobuf.Any.verify(message.msg);
                if (error)
                    return "msg." + error;
            }
            if (message.signature != null && message.hasOwnProperty("signature")) {
                var error = $root.types.Signature.verify(message.signature);
                if (error)
                    return "signature." + error;
            }
            if (message.createdHeight != null && message.hasOwnProperty("createdHeight"))
                if (!$util.isInteger(message.createdHeight) && !(message.createdHeight && $util.isInteger(message.createdHeight.low) && $util.isInteger(message.createdHeight.high)))
                    return "createdHeight: integer|Long expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.fee != null && message.hasOwnProperty("fee"))
                if (!$util.isInteger(message.fee) && !(message.fee && $util.isInteger(message.fee.low) && $util.isInteger(message.fee.high)))
                    return "fee: integer|Long expected";
            if (message.memo != null && message.hasOwnProperty("memo"))
                if (!$util.isString(message.memo))
                    return "memo: string expected";
            if (message.networkId != null && message.hasOwnProperty("networkId"))
                if (!$util.isInteger(message.networkId) && !(message.networkId && $util.isInteger(message.networkId.low) && $util.isInteger(message.networkId.high)))
                    return "networkId: integer|Long expected";
            if (message.chainId != null && message.hasOwnProperty("chainId"))
                if (!$util.isInteger(message.chainId) && !(message.chainId && $util.isInteger(message.chainId.low) && $util.isInteger(message.chainId.high)))
                    return "chainId: integer|Long expected";
            return null;
        };

        /**
         * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Transaction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Transaction} Transaction
         */
        Transaction.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Transaction)
                return object;
            var message = new $root.types.Transaction();
            if (object.messageType != null)
                message.messageType = String(object.messageType);
            if (object.msg != null) {
                if (typeof object.msg !== "object")
                    throw TypeError(".types.Transaction.msg: object expected");
                message.msg = $root.google.protobuf.Any.fromObject(object.msg);
            }
            if (object.signature != null) {
                if (typeof object.signature !== "object")
                    throw TypeError(".types.Transaction.signature: object expected");
                message.signature = $root.types.Signature.fromObject(object.signature);
            }
            if (object.createdHeight != null)
                if ($util.Long)
                    (message.createdHeight = $util.Long.fromValue(object.createdHeight)).unsigned = true;
                else if (typeof object.createdHeight === "string")
                    message.createdHeight = parseInt(object.createdHeight, 10);
                else if (typeof object.createdHeight === "number")
                    message.createdHeight = object.createdHeight;
                else if (typeof object.createdHeight === "object")
                    message.createdHeight = new $util.LongBits(object.createdHeight.low >>> 0, object.createdHeight.high >>> 0).toNumber(true);
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
            if (object.fee != null)
                if ($util.Long)
                    (message.fee = $util.Long.fromValue(object.fee)).unsigned = true;
                else if (typeof object.fee === "string")
                    message.fee = parseInt(object.fee, 10);
                else if (typeof object.fee === "number")
                    message.fee = object.fee;
                else if (typeof object.fee === "object")
                    message.fee = new $util.LongBits(object.fee.low >>> 0, object.fee.high >>> 0).toNumber(true);
            if (object.memo != null)
                message.memo = String(object.memo);
            if (object.networkId != null)
                if ($util.Long)
                    (message.networkId = $util.Long.fromValue(object.networkId)).unsigned = true;
                else if (typeof object.networkId === "string")
                    message.networkId = parseInt(object.networkId, 10);
                else if (typeof object.networkId === "number")
                    message.networkId = object.networkId;
                else if (typeof object.networkId === "object")
                    message.networkId = new $util.LongBits(object.networkId.low >>> 0, object.networkId.high >>> 0).toNumber(true);
            if (object.chainId != null)
                if ($util.Long)
                    (message.chainId = $util.Long.fromValue(object.chainId)).unsigned = true;
                else if (typeof object.chainId === "string")
                    message.chainId = parseInt(object.chainId, 10);
                else if (typeof object.chainId === "number")
                    message.chainId = object.chainId;
                else if (typeof object.chainId === "object")
                    message.chainId = new $util.LongBits(object.chainId.low >>> 0, object.chainId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Transaction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Transaction
         * @static
         * @param {types.Transaction} message Transaction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Transaction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.messageType = "";
                object.msg = null;
                object.signature = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.createdHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createdHeight = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.fee = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.fee = options.longs === String ? "0" : 0;
                object.memo = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.networkId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.networkId = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.chainId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.chainId = options.longs === String ? "0" : 0;
            }
            if (message.messageType != null && message.hasOwnProperty("messageType"))
                object.messageType = message.messageType;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = $root.google.protobuf.Any.toObject(message.msg, options);
            if (message.signature != null && message.hasOwnProperty("signature"))
                object.signature = $root.types.Signature.toObject(message.signature, options);
            if (message.createdHeight != null && message.hasOwnProperty("createdHeight"))
                if (typeof message.createdHeight === "number")
                    object.createdHeight = options.longs === String ? String(message.createdHeight) : message.createdHeight;
                else
                    object.createdHeight = options.longs === String ? $util.Long.prototype.toString.call(message.createdHeight) : options.longs === Number ? new $util.LongBits(message.createdHeight.low >>> 0, message.createdHeight.high >>> 0).toNumber(true) : message.createdHeight;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
            if (message.fee != null && message.hasOwnProperty("fee"))
                if (typeof message.fee === "number")
                    object.fee = options.longs === String ? String(message.fee) : message.fee;
                else
                    object.fee = options.longs === String ? $util.Long.prototype.toString.call(message.fee) : options.longs === Number ? new $util.LongBits(message.fee.low >>> 0, message.fee.high >>> 0).toNumber(true) : message.fee;
            if (message.memo != null && message.hasOwnProperty("memo"))
                object.memo = message.memo;
            if (message.networkId != null && message.hasOwnProperty("networkId"))
                if (typeof message.networkId === "number")
                    object.networkId = options.longs === String ? String(message.networkId) : message.networkId;
                else
                    object.networkId = options.longs === String ? $util.Long.prototype.toString.call(message.networkId) : options.longs === Number ? new $util.LongBits(message.networkId.low >>> 0, message.networkId.high >>> 0).toNumber(true) : message.networkId;
            if (message.chainId != null && message.hasOwnProperty("chainId"))
                if (typeof message.chainId === "number")
                    object.chainId = options.longs === String ? String(message.chainId) : message.chainId;
                else
                    object.chainId = options.longs === String ? $util.Long.prototype.toString.call(message.chainId) : options.longs === Number ? new $util.LongBits(message.chainId.low >>> 0, message.chainId.high >>> 0).toNumber(true) : message.chainId;
            return object;
        };

        /**
         * Converts this Transaction to JSON.
         * @function toJSON
         * @memberof types.Transaction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Transaction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Transaction
         * @function getTypeUrl
         * @memberof types.Transaction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Transaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Transaction";
        };

        return Transaction;
    })();

    types.MessageSend = (function() {

        /**
         * Properties of a MessageSend.
         * @memberof types
         * @interface IMessageSend
         * @property {Uint8Array|null} [fromAddress] MessageSend fromAddress
         * @property {Uint8Array|null} [toAddress] MessageSend toAddress
         * @property {number|Long|null} [amount] MessageSend amount
         */

        /**
         * Constructs a new MessageSend.
         * @memberof types
         * @classdesc Represents a MessageSend.
         * @implements IMessageSend
         * @constructor
         * @param {types.IMessageSend=} [properties] Properties to set
         */
        function MessageSend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageSend fromAddress.
         * @member {Uint8Array} fromAddress
         * @memberof types.MessageSend
         * @instance
         */
        MessageSend.prototype.fromAddress = $util.newBuffer([]);

        /**
         * MessageSend toAddress.
         * @member {Uint8Array} toAddress
         * @memberof types.MessageSend
         * @instance
         */
        MessageSend.prototype.toAddress = $util.newBuffer([]);

        /**
         * MessageSend amount.
         * @member {number|Long} amount
         * @memberof types.MessageSend
         * @instance
         */
        MessageSend.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new MessageSend instance using the specified properties.
         * @function create
         * @memberof types.MessageSend
         * @static
         * @param {types.IMessageSend=} [properties] Properties to set
         * @returns {types.MessageSend} MessageSend instance
         */
        MessageSend.create = function create(properties) {
            return new MessageSend(properties);
        };

        /**
         * Encodes the specified MessageSend message. Does not implicitly {@link types.MessageSend.verify|verify} messages.
         * @function encode
         * @memberof types.MessageSend
         * @static
         * @param {types.IMessageSend} message MessageSend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageSend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.toAddress);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.amount);
            return writer;
        };

        /**
         * Encodes the specified MessageSend message, length delimited. Does not implicitly {@link types.MessageSend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageSend
         * @static
         * @param {types.IMessageSend} message MessageSend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageSend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageSend message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageSend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageSend} MessageSend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageSend.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageSend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.fromAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.toAddress = reader.bytes();
                        break;
                    }
                case 3: {
                        message.amount = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageSend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageSend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageSend} MessageSend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageSend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageSend message.
         * @function verify
         * @memberof types.MessageSend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageSend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                if (!(message.fromAddress && typeof message.fromAddress.length === "number" || $util.isString(message.fromAddress)))
                    return "fromAddress: buffer expected";
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                if (!(message.toAddress && typeof message.toAddress.length === "number" || $util.isString(message.toAddress)))
                    return "toAddress: buffer expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                    return "amount: integer|Long expected";
            return null;
        };

        /**
         * Creates a MessageSend message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageSend
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageSend} MessageSend
         */
        MessageSend.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessageSend)
                return object;
            var message = new $root.types.MessageSend();
            if (object.fromAddress != null)
                if (typeof object.fromAddress === "string")
                    $util.base64.decode(object.fromAddress, message.fromAddress = $util.newBuffer($util.base64.length(object.fromAddress)), 0);
                else if (object.fromAddress.length >= 0)
                    message.fromAddress = object.fromAddress;
            if (object.toAddress != null)
                if (typeof object.toAddress === "string")
                    $util.base64.decode(object.toAddress, message.toAddress = $util.newBuffer($util.base64.length(object.toAddress)), 0);
                else if (object.toAddress.length >= 0)
                    message.toAddress = object.toAddress;
            if (object.amount != null)
                if ($util.Long)
                    (message.amount = $util.Long.fromValue(object.amount)).unsigned = true;
                else if (typeof object.amount === "string")
                    message.amount = parseInt(object.amount, 10);
                else if (typeof object.amount === "number")
                    message.amount = object.amount;
                else if (typeof object.amount === "object")
                    message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a MessageSend message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageSend
         * @static
         * @param {types.MessageSend} message MessageSend
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageSend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.fromAddress = "";
                else {
                    object.fromAddress = [];
                    if (options.bytes !== Array)
                        object.fromAddress = $util.newBuffer(object.fromAddress);
                }
                if (options.bytes === String)
                    object.toAddress = "";
                else {
                    object.toAddress = [];
                    if (options.bytes !== Array)
                        object.toAddress = $util.newBuffer(object.toAddress);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount = options.longs === String ? "0" : 0;
            }
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                object.fromAddress = options.bytes === String ? $util.base64.encode(message.fromAddress, 0, message.fromAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.fromAddress) : message.fromAddress;
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                object.toAddress = options.bytes === String ? $util.base64.encode(message.toAddress, 0, message.toAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAddress) : message.toAddress;
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount === "number")
                    object.amount = options.longs === String ? String(message.amount) : message.amount;
                else
                    object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber(true) : message.amount;
            return object;
        };

        /**
         * Converts this MessageSend to JSON.
         * @function toJSON
         * @memberof types.MessageSend
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageSend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageSend
         * @function getTypeUrl
         * @memberof types.MessageSend
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageSend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageSend";
        };

        return MessageSend;
    })();

    types.FeeParams = (function() {

        /**
         * Properties of a FeeParams.
         * @memberof types
         * @interface IFeeParams
         * @property {number|Long|null} [sendFee] FeeParams sendFee
         */

        /**
         * Constructs a new FeeParams.
         * @memberof types
         * @classdesc Represents a FeeParams.
         * @implements IFeeParams
         * @constructor
         * @param {types.IFeeParams=} [properties] Properties to set
         */
        function FeeParams(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FeeParams sendFee.
         * @member {number|Long} sendFee
         * @memberof types.FeeParams
         * @instance
         */
        FeeParams.prototype.sendFee = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new FeeParams instance using the specified properties.
         * @function create
         * @memberof types.FeeParams
         * @static
         * @param {types.IFeeParams=} [properties] Properties to set
         * @returns {types.FeeParams} FeeParams instance
         */
        FeeParams.create = function create(properties) {
            return new FeeParams(properties);
        };

        /**
         * Encodes the specified FeeParams message. Does not implicitly {@link types.FeeParams.verify|verify} messages.
         * @function encode
         * @memberof types.FeeParams
         * @static
         * @param {types.IFeeParams} message FeeParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FeeParams.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sendFee != null && Object.hasOwnProperty.call(message, "sendFee"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.sendFee);
            return writer;
        };

        /**
         * Encodes the specified FeeParams message, length delimited. Does not implicitly {@link types.FeeParams.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.FeeParams
         * @static
         * @param {types.IFeeParams} message FeeParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FeeParams.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FeeParams message from the specified reader or buffer.
         * @function decode
         * @memberof types.FeeParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.FeeParams} FeeParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FeeParams.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.FeeParams();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sendFee = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FeeParams message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.FeeParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.FeeParams} FeeParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FeeParams.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FeeParams message.
         * @function verify
         * @memberof types.FeeParams
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FeeParams.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sendFee != null && message.hasOwnProperty("sendFee"))
                if (!$util.isInteger(message.sendFee) && !(message.sendFee && $util.isInteger(message.sendFee.low) && $util.isInteger(message.sendFee.high)))
                    return "sendFee: integer|Long expected";
            return null;
        };

        /**
         * Creates a FeeParams message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.FeeParams
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.FeeParams} FeeParams
         */
        FeeParams.fromObject = function fromObject(object) {
            if (object instanceof $root.types.FeeParams)
                return object;
            var message = new $root.types.FeeParams();
            if (object.sendFee != null)
                if ($util.Long)
                    (message.sendFee = $util.Long.fromValue(object.sendFee)).unsigned = true;
                else if (typeof object.sendFee === "string")
                    message.sendFee = parseInt(object.sendFee, 10);
                else if (typeof object.sendFee === "number")
                    message.sendFee = object.sendFee;
                else if (typeof object.sendFee === "object")
                    message.sendFee = new $util.LongBits(object.sendFee.low >>> 0, object.sendFee.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a FeeParams message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.FeeParams
         * @static
         * @param {types.FeeParams} message FeeParams
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FeeParams.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.sendFee = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sendFee = options.longs === String ? "0" : 0;
            if (message.sendFee != null && message.hasOwnProperty("sendFee"))
                if (typeof message.sendFee === "number")
                    object.sendFee = options.longs === String ? String(message.sendFee) : message.sendFee;
                else
                    object.sendFee = options.longs === String ? $util.Long.prototype.toString.call(message.sendFee) : options.longs === Number ? new $util.LongBits(message.sendFee.low >>> 0, message.sendFee.high >>> 0).toNumber(true) : message.sendFee;
            return object;
        };

        /**
         * Converts this FeeParams to JSON.
         * @function toJSON
         * @memberof types.FeeParams
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FeeParams.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for FeeParams
         * @function getTypeUrl
         * @memberof types.FeeParams
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        FeeParams.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.FeeParams";
        };

        return FeeParams;
    })();

    types.Signature = (function() {

        /**
         * Properties of a Signature.
         * @memberof types
         * @interface ISignature
         * @property {Uint8Array|null} [publicKey] Signature publicKey
         * @property {Uint8Array|null} [signature] Signature signature
         */

        /**
         * Constructs a new Signature.
         * @memberof types
         * @classdesc Represents a Signature.
         * @implements ISignature
         * @constructor
         * @param {types.ISignature=} [properties] Properties to set
         */
        function Signature(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Signature publicKey.
         * @member {Uint8Array} publicKey
         * @memberof types.Signature
         * @instance
         */
        Signature.prototype.publicKey = $util.newBuffer([]);

        /**
         * Signature signature.
         * @member {Uint8Array} signature
         * @memberof types.Signature
         * @instance
         */
        Signature.prototype.signature = $util.newBuffer([]);

        /**
         * Creates a new Signature instance using the specified properties.
         * @function create
         * @memberof types.Signature
         * @static
         * @param {types.ISignature=} [properties] Properties to set
         * @returns {types.Signature} Signature instance
         */
        Signature.create = function create(properties) {
            return new Signature(properties);
        };

        /**
         * Encodes the specified Signature message. Does not implicitly {@link types.Signature.verify|verify} messages.
         * @function encode
         * @memberof types.Signature
         * @static
         * @param {types.ISignature} message Signature message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Signature.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
            return writer;
        };

        /**
         * Encodes the specified Signature message, length delimited. Does not implicitly {@link types.Signature.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Signature
         * @static
         * @param {types.ISignature} message Signature message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Signature.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Signature message from the specified reader or buffer.
         * @function decode
         * @memberof types.Signature
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Signature} Signature
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Signature.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Signature();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.publicKey = reader.bytes();
                        break;
                    }
                case 2: {
                        message.signature = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Signature message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Signature
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Signature} Signature
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Signature.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Signature message.
         * @function verify
         * @memberof types.Signature
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Signature.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                    return "publicKey: buffer expected";
            if (message.signature != null && message.hasOwnProperty("signature"))
                if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                    return "signature: buffer expected";
            return null;
        };

        /**
         * Creates a Signature message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Signature
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Signature} Signature
         */
        Signature.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Signature)
                return object;
            var message = new $root.types.Signature();
            if (object.publicKey != null)
                if (typeof object.publicKey === "string")
                    $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                else if (object.publicKey.length >= 0)
                    message.publicKey = object.publicKey;
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length >= 0)
                    message.signature = object.signature;
            return message;
        };

        /**
         * Creates a plain object from a Signature message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Signature
         * @static
         * @param {types.Signature} message Signature
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Signature.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.publicKey = "";
                else {
                    object.publicKey = [];
                    if (options.bytes !== Array)
                        object.publicKey = $util.newBuffer(object.publicKey);
                }
                if (options.bytes === String)
                    object.signature = "";
                else {
                    object.signature = [];
                    if (options.bytes !== Array)
                        object.signature = $util.newBuffer(object.signature);
                }
            }
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
            if (message.signature != null && message.hasOwnProperty("signature"))
                object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
            return object;
        };

        /**
         * Converts this Signature to JSON.
         * @function toJSON
         * @memberof types.Signature
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Signature.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Signature
         * @function getTypeUrl
         * @memberof types.Signature
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Signature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Signature";
        };

        return Signature;
    })();

    types.MessageRegisterIdentity = (function() {

        /**
         * Properties of a MessageRegisterIdentity.
         * @memberof types
         * @interface IMessageRegisterIdentity
         * @property {Uint8Array|null} [authorAddress] MessageRegisterIdentity authorAddress
         * @property {string|null} [handle] MessageRegisterIdentity handle
         * @property {string|null} [bio] MessageRegisterIdentity bio
         */

        /**
         * Constructs a new MessageRegisterIdentity.
         * @memberof types
         * @classdesc Represents a MessageRegisterIdentity.
         * @implements IMessageRegisterIdentity
         * @constructor
         * @param {types.IMessageRegisterIdentity=} [properties] Properties to set
         */
        function MessageRegisterIdentity(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageRegisterIdentity authorAddress.
         * @member {Uint8Array} authorAddress
         * @memberof types.MessageRegisterIdentity
         * @instance
         */
        MessageRegisterIdentity.prototype.authorAddress = $util.newBuffer([]);

        /**
         * MessageRegisterIdentity handle.
         * @member {string} handle
         * @memberof types.MessageRegisterIdentity
         * @instance
         */
        MessageRegisterIdentity.prototype.handle = "";

        /**
         * MessageRegisterIdentity bio.
         * @member {string} bio
         * @memberof types.MessageRegisterIdentity
         * @instance
         */
        MessageRegisterIdentity.prototype.bio = "";

        /**
         * Creates a new MessageRegisterIdentity instance using the specified properties.
         * @function create
         * @memberof types.MessageRegisterIdentity
         * @static
         * @param {types.IMessageRegisterIdentity=} [properties] Properties to set
         * @returns {types.MessageRegisterIdentity} MessageRegisterIdentity instance
         */
        MessageRegisterIdentity.create = function create(properties) {
            return new MessageRegisterIdentity(properties);
        };

        /**
         * Encodes the specified MessageRegisterIdentity message. Does not implicitly {@link types.MessageRegisterIdentity.verify|verify} messages.
         * @function encode
         * @memberof types.MessageRegisterIdentity
         * @static
         * @param {types.IMessageRegisterIdentity} message MessageRegisterIdentity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageRegisterIdentity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.authorAddress != null && Object.hasOwnProperty.call(message, "authorAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.authorAddress);
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.handle);
            if (message.bio != null && Object.hasOwnProperty.call(message, "bio"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.bio);
            return writer;
        };

        /**
         * Encodes the specified MessageRegisterIdentity message, length delimited. Does not implicitly {@link types.MessageRegisterIdentity.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageRegisterIdentity
         * @static
         * @param {types.IMessageRegisterIdentity} message MessageRegisterIdentity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageRegisterIdentity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageRegisterIdentity message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageRegisterIdentity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageRegisterIdentity} MessageRegisterIdentity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageRegisterIdentity.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageRegisterIdentity();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.authorAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.handle = reader.string();
                        break;
                    }
                case 3: {
                        message.bio = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageRegisterIdentity message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageRegisterIdentity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageRegisterIdentity} MessageRegisterIdentity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageRegisterIdentity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageRegisterIdentity message.
         * @function verify
         * @memberof types.MessageRegisterIdentity
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageRegisterIdentity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.authorAddress != null && message.hasOwnProperty("authorAddress"))
                if (!(message.authorAddress && typeof message.authorAddress.length === "number" || $util.isString(message.authorAddress)))
                    return "authorAddress: buffer expected";
            if (message.handle != null && message.hasOwnProperty("handle"))
                if (!$util.isString(message.handle))
                    return "handle: string expected";
            if (message.bio != null && message.hasOwnProperty("bio"))
                if (!$util.isString(message.bio))
                    return "bio: string expected";
            return null;
        };

        /**
         * Creates a MessageRegisterIdentity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageRegisterIdentity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageRegisterIdentity} MessageRegisterIdentity
         */
        MessageRegisterIdentity.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessageRegisterIdentity)
                return object;
            var message = new $root.types.MessageRegisterIdentity();
            if (object.authorAddress != null)
                if (typeof object.authorAddress === "string")
                    $util.base64.decode(object.authorAddress, message.authorAddress = $util.newBuffer($util.base64.length(object.authorAddress)), 0);
                else if (object.authorAddress.length >= 0)
                    message.authorAddress = object.authorAddress;
            if (object.handle != null)
                message.handle = String(object.handle);
            if (object.bio != null)
                message.bio = String(object.bio);
            return message;
        };

        /**
         * Creates a plain object from a MessageRegisterIdentity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageRegisterIdentity
         * @static
         * @param {types.MessageRegisterIdentity} message MessageRegisterIdentity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageRegisterIdentity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.authorAddress = "";
                else {
                    object.authorAddress = [];
                    if (options.bytes !== Array)
                        object.authorAddress = $util.newBuffer(object.authorAddress);
                }
                object.handle = "";
                object.bio = "";
            }
            if (message.authorAddress != null && message.hasOwnProperty("authorAddress"))
                object.authorAddress = options.bytes === String ? $util.base64.encode(message.authorAddress, 0, message.authorAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.authorAddress) : message.authorAddress;
            if (message.handle != null && message.hasOwnProperty("handle"))
                object.handle = message.handle;
            if (message.bio != null && message.hasOwnProperty("bio"))
                object.bio = message.bio;
            return object;
        };

        /**
         * Converts this MessageRegisterIdentity to JSON.
         * @function toJSON
         * @memberof types.MessageRegisterIdentity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageRegisterIdentity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageRegisterIdentity
         * @function getTypeUrl
         * @memberof types.MessageRegisterIdentity
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageRegisterIdentity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageRegisterIdentity";
        };

        return MessageRegisterIdentity;
    })();

    types.MessageWeaveThread = (function() {

        /**
         * Properties of a MessageWeaveThread.
         * @memberof types
         * @interface IMessageWeaveThread
         * @property {Uint8Array|null} [fromAddress] MessageWeaveThread fromAddress
         * @property {Uint8Array|null} [toAddress] MessageWeaveThread toAddress
         * @property {number|Long|null} [stakeAmount] MessageWeaveThread stakeAmount
         * @property {string|null} [skillTag] MessageWeaveThread skillTag
         */

        /**
         * Constructs a new MessageWeaveThread.
         * @memberof types
         * @classdesc Represents a MessageWeaveThread.
         * @implements IMessageWeaveThread
         * @constructor
         * @param {types.IMessageWeaveThread=} [properties] Properties to set
         */
        function MessageWeaveThread(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageWeaveThread fromAddress.
         * @member {Uint8Array} fromAddress
         * @memberof types.MessageWeaveThread
         * @instance
         */
        MessageWeaveThread.prototype.fromAddress = $util.newBuffer([]);

        /**
         * MessageWeaveThread toAddress.
         * @member {Uint8Array} toAddress
         * @memberof types.MessageWeaveThread
         * @instance
         */
        MessageWeaveThread.prototype.toAddress = $util.newBuffer([]);

        /**
         * MessageWeaveThread stakeAmount.
         * @member {number|Long} stakeAmount
         * @memberof types.MessageWeaveThread
         * @instance
         */
        MessageWeaveThread.prototype.stakeAmount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MessageWeaveThread skillTag.
         * @member {string} skillTag
         * @memberof types.MessageWeaveThread
         * @instance
         */
        MessageWeaveThread.prototype.skillTag = "";

        /**
         * Creates a new MessageWeaveThread instance using the specified properties.
         * @function create
         * @memberof types.MessageWeaveThread
         * @static
         * @param {types.IMessageWeaveThread=} [properties] Properties to set
         * @returns {types.MessageWeaveThread} MessageWeaveThread instance
         */
        MessageWeaveThread.create = function create(properties) {
            return new MessageWeaveThread(properties);
        };

        /**
         * Encodes the specified MessageWeaveThread message. Does not implicitly {@link types.MessageWeaveThread.verify|verify} messages.
         * @function encode
         * @memberof types.MessageWeaveThread
         * @static
         * @param {types.IMessageWeaveThread} message MessageWeaveThread message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageWeaveThread.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.toAddress);
            if (message.stakeAmount != null && Object.hasOwnProperty.call(message, "stakeAmount"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.stakeAmount);
            if (message.skillTag != null && Object.hasOwnProperty.call(message, "skillTag"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.skillTag);
            return writer;
        };

        /**
         * Encodes the specified MessageWeaveThread message, length delimited. Does not implicitly {@link types.MessageWeaveThread.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageWeaveThread
         * @static
         * @param {types.IMessageWeaveThread} message MessageWeaveThread message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageWeaveThread.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageWeaveThread message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageWeaveThread
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageWeaveThread} MessageWeaveThread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageWeaveThread.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageWeaveThread();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.fromAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.toAddress = reader.bytes();
                        break;
                    }
                case 3: {
                        message.stakeAmount = reader.uint64();
                        break;
                    }
                case 4: {
                        message.skillTag = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageWeaveThread message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageWeaveThread
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageWeaveThread} MessageWeaveThread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageWeaveThread.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageWeaveThread message.
         * @function verify
         * @memberof types.MessageWeaveThread
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageWeaveThread.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                if (!(message.fromAddress && typeof message.fromAddress.length === "number" || $util.isString(message.fromAddress)))
                    return "fromAddress: buffer expected";
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                if (!(message.toAddress && typeof message.toAddress.length === "number" || $util.isString(message.toAddress)))
                    return "toAddress: buffer expected";
            if (message.stakeAmount != null && message.hasOwnProperty("stakeAmount"))
                if (!$util.isInteger(message.stakeAmount) && !(message.stakeAmount && $util.isInteger(message.stakeAmount.low) && $util.isInteger(message.stakeAmount.high)))
                    return "stakeAmount: integer|Long expected";
            if (message.skillTag != null && message.hasOwnProperty("skillTag"))
                if (!$util.isString(message.skillTag))
                    return "skillTag: string expected";
            return null;
        };

        /**
         * Creates a MessageWeaveThread message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageWeaveThread
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageWeaveThread} MessageWeaveThread
         */
        MessageWeaveThread.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessageWeaveThread)
                return object;
            var message = new $root.types.MessageWeaveThread();
            if (object.fromAddress != null)
                if (typeof object.fromAddress === "string")
                    $util.base64.decode(object.fromAddress, message.fromAddress = $util.newBuffer($util.base64.length(object.fromAddress)), 0);
                else if (object.fromAddress.length >= 0)
                    message.fromAddress = object.fromAddress;
            if (object.toAddress != null)
                if (typeof object.toAddress === "string")
                    $util.base64.decode(object.toAddress, message.toAddress = $util.newBuffer($util.base64.length(object.toAddress)), 0);
                else if (object.toAddress.length >= 0)
                    message.toAddress = object.toAddress;
            if (object.stakeAmount != null)
                if ($util.Long)
                    (message.stakeAmount = $util.Long.fromValue(object.stakeAmount)).unsigned = true;
                else if (typeof object.stakeAmount === "string")
                    message.stakeAmount = parseInt(object.stakeAmount, 10);
                else if (typeof object.stakeAmount === "number")
                    message.stakeAmount = object.stakeAmount;
                else if (typeof object.stakeAmount === "object")
                    message.stakeAmount = new $util.LongBits(object.stakeAmount.low >>> 0, object.stakeAmount.high >>> 0).toNumber(true);
            if (object.skillTag != null)
                message.skillTag = String(object.skillTag);
            return message;
        };

        /**
         * Creates a plain object from a MessageWeaveThread message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageWeaveThread
         * @static
         * @param {types.MessageWeaveThread} message MessageWeaveThread
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageWeaveThread.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.fromAddress = "";
                else {
                    object.fromAddress = [];
                    if (options.bytes !== Array)
                        object.fromAddress = $util.newBuffer(object.fromAddress);
                }
                if (options.bytes === String)
                    object.toAddress = "";
                else {
                    object.toAddress = [];
                    if (options.bytes !== Array)
                        object.toAddress = $util.newBuffer(object.toAddress);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.stakeAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.stakeAmount = options.longs === String ? "0" : 0;
                object.skillTag = "";
            }
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                object.fromAddress = options.bytes === String ? $util.base64.encode(message.fromAddress, 0, message.fromAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.fromAddress) : message.fromAddress;
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                object.toAddress = options.bytes === String ? $util.base64.encode(message.toAddress, 0, message.toAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAddress) : message.toAddress;
            if (message.stakeAmount != null && message.hasOwnProperty("stakeAmount"))
                if (typeof message.stakeAmount === "number")
                    object.stakeAmount = options.longs === String ? String(message.stakeAmount) : message.stakeAmount;
                else
                    object.stakeAmount = options.longs === String ? $util.Long.prototype.toString.call(message.stakeAmount) : options.longs === Number ? new $util.LongBits(message.stakeAmount.low >>> 0, message.stakeAmount.high >>> 0).toNumber(true) : message.stakeAmount;
            if (message.skillTag != null && message.hasOwnProperty("skillTag"))
                object.skillTag = message.skillTag;
            return object;
        };

        /**
         * Converts this MessageWeaveThread to JSON.
         * @function toJSON
         * @memberof types.MessageWeaveThread
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageWeaveThread.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageWeaveThread
         * @function getTypeUrl
         * @memberof types.MessageWeaveThread
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageWeaveThread.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageWeaveThread";
        };

        return MessageWeaveThread;
    })();

    types.MessageBreakThread = (function() {

        /**
         * Properties of a MessageBreakThread.
         * @memberof types
         * @interface IMessageBreakThread
         * @property {Uint8Array|null} [fromAddress] MessageBreakThread fromAddress
         * @property {Uint8Array|null} [toAddress] MessageBreakThread toAddress
         */

        /**
         * Constructs a new MessageBreakThread.
         * @memberof types
         * @classdesc Represents a MessageBreakThread.
         * @implements IMessageBreakThread
         * @constructor
         * @param {types.IMessageBreakThread=} [properties] Properties to set
         */
        function MessageBreakThread(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageBreakThread fromAddress.
         * @member {Uint8Array} fromAddress
         * @memberof types.MessageBreakThread
         * @instance
         */
        MessageBreakThread.prototype.fromAddress = $util.newBuffer([]);

        /**
         * MessageBreakThread toAddress.
         * @member {Uint8Array} toAddress
         * @memberof types.MessageBreakThread
         * @instance
         */
        MessageBreakThread.prototype.toAddress = $util.newBuffer([]);

        /**
         * Creates a new MessageBreakThread instance using the specified properties.
         * @function create
         * @memberof types.MessageBreakThread
         * @static
         * @param {types.IMessageBreakThread=} [properties] Properties to set
         * @returns {types.MessageBreakThread} MessageBreakThread instance
         */
        MessageBreakThread.create = function create(properties) {
            return new MessageBreakThread(properties);
        };

        /**
         * Encodes the specified MessageBreakThread message. Does not implicitly {@link types.MessageBreakThread.verify|verify} messages.
         * @function encode
         * @memberof types.MessageBreakThread
         * @static
         * @param {types.IMessageBreakThread} message MessageBreakThread message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageBreakThread.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.toAddress);
            return writer;
        };

        /**
         * Encodes the specified MessageBreakThread message, length delimited. Does not implicitly {@link types.MessageBreakThread.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageBreakThread
         * @static
         * @param {types.IMessageBreakThread} message MessageBreakThread message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageBreakThread.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageBreakThread message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageBreakThread
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageBreakThread} MessageBreakThread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageBreakThread.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageBreakThread();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.fromAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.toAddress = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageBreakThread message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageBreakThread
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageBreakThread} MessageBreakThread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageBreakThread.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageBreakThread message.
         * @function verify
         * @memberof types.MessageBreakThread
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageBreakThread.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                if (!(message.fromAddress && typeof message.fromAddress.length === "number" || $util.isString(message.fromAddress)))
                    return "fromAddress: buffer expected";
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                if (!(message.toAddress && typeof message.toAddress.length === "number" || $util.isString(message.toAddress)))
                    return "toAddress: buffer expected";
            return null;
        };

        /**
         * Creates a MessageBreakThread message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageBreakThread
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageBreakThread} MessageBreakThread
         */
        MessageBreakThread.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessageBreakThread)
                return object;
            var message = new $root.types.MessageBreakThread();
            if (object.fromAddress != null)
                if (typeof object.fromAddress === "string")
                    $util.base64.decode(object.fromAddress, message.fromAddress = $util.newBuffer($util.base64.length(object.fromAddress)), 0);
                else if (object.fromAddress.length >= 0)
                    message.fromAddress = object.fromAddress;
            if (object.toAddress != null)
                if (typeof object.toAddress === "string")
                    $util.base64.decode(object.toAddress, message.toAddress = $util.newBuffer($util.base64.length(object.toAddress)), 0);
                else if (object.toAddress.length >= 0)
                    message.toAddress = object.toAddress;
            return message;
        };

        /**
         * Creates a plain object from a MessageBreakThread message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageBreakThread
         * @static
         * @param {types.MessageBreakThread} message MessageBreakThread
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageBreakThread.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.fromAddress = "";
                else {
                    object.fromAddress = [];
                    if (options.bytes !== Array)
                        object.fromAddress = $util.newBuffer(object.fromAddress);
                }
                if (options.bytes === String)
                    object.toAddress = "";
                else {
                    object.toAddress = [];
                    if (options.bytes !== Array)
                        object.toAddress = $util.newBuffer(object.toAddress);
                }
            }
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                object.fromAddress = options.bytes === String ? $util.base64.encode(message.fromAddress, 0, message.fromAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.fromAddress) : message.fromAddress;
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                object.toAddress = options.bytes === String ? $util.base64.encode(message.toAddress, 0, message.toAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAddress) : message.toAddress;
            return object;
        };

        /**
         * Converts this MessageBreakThread to JSON.
         * @function toJSON
         * @memberof types.MessageBreakThread
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageBreakThread.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageBreakThread
         * @function getTypeUrl
         * @memberof types.MessageBreakThread
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageBreakThread.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageBreakThread";
        };

        return MessageBreakThread;
    })();

    types.MessageEndorseSkill = (function() {

        /**
         * Properties of a MessageEndorseSkill.
         * @memberof types
         * @interface IMessageEndorseSkill
         * @property {Uint8Array|null} [fromAddress] MessageEndorseSkill fromAddress
         * @property {Uint8Array|null} [toAddress] MessageEndorseSkill toAddress
         * @property {string|null} [skill] MessageEndorseSkill skill
         */

        /**
         * Constructs a new MessageEndorseSkill.
         * @memberof types
         * @classdesc Represents a MessageEndorseSkill.
         * @implements IMessageEndorseSkill
         * @constructor
         * @param {types.IMessageEndorseSkill=} [properties] Properties to set
         */
        function MessageEndorseSkill(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageEndorseSkill fromAddress.
         * @member {Uint8Array} fromAddress
         * @memberof types.MessageEndorseSkill
         * @instance
         */
        MessageEndorseSkill.prototype.fromAddress = $util.newBuffer([]);

        /**
         * MessageEndorseSkill toAddress.
         * @member {Uint8Array} toAddress
         * @memberof types.MessageEndorseSkill
         * @instance
         */
        MessageEndorseSkill.prototype.toAddress = $util.newBuffer([]);

        /**
         * MessageEndorseSkill skill.
         * @member {string} skill
         * @memberof types.MessageEndorseSkill
         * @instance
         */
        MessageEndorseSkill.prototype.skill = "";

        /**
         * Creates a new MessageEndorseSkill instance using the specified properties.
         * @function create
         * @memberof types.MessageEndorseSkill
         * @static
         * @param {types.IMessageEndorseSkill=} [properties] Properties to set
         * @returns {types.MessageEndorseSkill} MessageEndorseSkill instance
         */
        MessageEndorseSkill.create = function create(properties) {
            return new MessageEndorseSkill(properties);
        };

        /**
         * Encodes the specified MessageEndorseSkill message. Does not implicitly {@link types.MessageEndorseSkill.verify|verify} messages.
         * @function encode
         * @memberof types.MessageEndorseSkill
         * @static
         * @param {types.IMessageEndorseSkill} message MessageEndorseSkill message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageEndorseSkill.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.toAddress);
            if (message.skill != null && Object.hasOwnProperty.call(message, "skill"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.skill);
            return writer;
        };

        /**
         * Encodes the specified MessageEndorseSkill message, length delimited. Does not implicitly {@link types.MessageEndorseSkill.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageEndorseSkill
         * @static
         * @param {types.IMessageEndorseSkill} message MessageEndorseSkill message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageEndorseSkill.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageEndorseSkill message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageEndorseSkill
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageEndorseSkill} MessageEndorseSkill
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageEndorseSkill.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageEndorseSkill();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.fromAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.toAddress = reader.bytes();
                        break;
                    }
                case 3: {
                        message.skill = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageEndorseSkill message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageEndorseSkill
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageEndorseSkill} MessageEndorseSkill
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageEndorseSkill.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageEndorseSkill message.
         * @function verify
         * @memberof types.MessageEndorseSkill
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageEndorseSkill.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                if (!(message.fromAddress && typeof message.fromAddress.length === "number" || $util.isString(message.fromAddress)))
                    return "fromAddress: buffer expected";
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                if (!(message.toAddress && typeof message.toAddress.length === "number" || $util.isString(message.toAddress)))
                    return "toAddress: buffer expected";
            if (message.skill != null && message.hasOwnProperty("skill"))
                if (!$util.isString(message.skill))
                    return "skill: string expected";
            return null;
        };

        /**
         * Creates a MessageEndorseSkill message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageEndorseSkill
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageEndorseSkill} MessageEndorseSkill
         */
        MessageEndorseSkill.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessageEndorseSkill)
                return object;
            var message = new $root.types.MessageEndorseSkill();
            if (object.fromAddress != null)
                if (typeof object.fromAddress === "string")
                    $util.base64.decode(object.fromAddress, message.fromAddress = $util.newBuffer($util.base64.length(object.fromAddress)), 0);
                else if (object.fromAddress.length >= 0)
                    message.fromAddress = object.fromAddress;
            if (object.toAddress != null)
                if (typeof object.toAddress === "string")
                    $util.base64.decode(object.toAddress, message.toAddress = $util.newBuffer($util.base64.length(object.toAddress)), 0);
                else if (object.toAddress.length >= 0)
                    message.toAddress = object.toAddress;
            if (object.skill != null)
                message.skill = String(object.skill);
            return message;
        };

        /**
         * Creates a plain object from a MessageEndorseSkill message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageEndorseSkill
         * @static
         * @param {types.MessageEndorseSkill} message MessageEndorseSkill
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageEndorseSkill.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.fromAddress = "";
                else {
                    object.fromAddress = [];
                    if (options.bytes !== Array)
                        object.fromAddress = $util.newBuffer(object.fromAddress);
                }
                if (options.bytes === String)
                    object.toAddress = "";
                else {
                    object.toAddress = [];
                    if (options.bytes !== Array)
                        object.toAddress = $util.newBuffer(object.toAddress);
                }
                object.skill = "";
            }
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                object.fromAddress = options.bytes === String ? $util.base64.encode(message.fromAddress, 0, message.fromAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.fromAddress) : message.fromAddress;
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                object.toAddress = options.bytes === String ? $util.base64.encode(message.toAddress, 0, message.toAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAddress) : message.toAddress;
            if (message.skill != null && message.hasOwnProperty("skill"))
                object.skill = message.skill;
            return object;
        };

        /**
         * Converts this MessageEndorseSkill to JSON.
         * @function toJSON
         * @memberof types.MessageEndorseSkill
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageEndorseSkill.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageEndorseSkill
         * @function getTypeUrl
         * @memberof types.MessageEndorseSkill
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageEndorseSkill.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageEndorseSkill";
        };

        return MessageEndorseSkill;
    })();

    types.MessageFormGuild = (function() {

        /**
         * Properties of a MessageFormGuild.
         * @memberof types
         * @interface IMessageFormGuild
         * @property {Uint8Array|null} [creatorAddress] MessageFormGuild creatorAddress
         * @property {string|null} [name] MessageFormGuild name
         * @property {string|null} [description] MessageFormGuild description
         * @property {number|Long|null} [minTrust] MessageFormGuild minTrust
         */

        /**
         * Constructs a new MessageFormGuild.
         * @memberof types
         * @classdesc Represents a MessageFormGuild.
         * @implements IMessageFormGuild
         * @constructor
         * @param {types.IMessageFormGuild=} [properties] Properties to set
         */
        function MessageFormGuild(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageFormGuild creatorAddress.
         * @member {Uint8Array} creatorAddress
         * @memberof types.MessageFormGuild
         * @instance
         */
        MessageFormGuild.prototype.creatorAddress = $util.newBuffer([]);

        /**
         * MessageFormGuild name.
         * @member {string} name
         * @memberof types.MessageFormGuild
         * @instance
         */
        MessageFormGuild.prototype.name = "";

        /**
         * MessageFormGuild description.
         * @member {string} description
         * @memberof types.MessageFormGuild
         * @instance
         */
        MessageFormGuild.prototype.description = "";

        /**
         * MessageFormGuild minTrust.
         * @member {number|Long} minTrust
         * @memberof types.MessageFormGuild
         * @instance
         */
        MessageFormGuild.prototype.minTrust = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new MessageFormGuild instance using the specified properties.
         * @function create
         * @memberof types.MessageFormGuild
         * @static
         * @param {types.IMessageFormGuild=} [properties] Properties to set
         * @returns {types.MessageFormGuild} MessageFormGuild instance
         */
        MessageFormGuild.create = function create(properties) {
            return new MessageFormGuild(properties);
        };

        /**
         * Encodes the specified MessageFormGuild message. Does not implicitly {@link types.MessageFormGuild.verify|verify} messages.
         * @function encode
         * @memberof types.MessageFormGuild
         * @static
         * @param {types.IMessageFormGuild} message MessageFormGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageFormGuild.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.creatorAddress != null && Object.hasOwnProperty.call(message, "creatorAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.creatorAddress);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            if (message.minTrust != null && Object.hasOwnProperty.call(message, "minTrust"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.minTrust);
            return writer;
        };

        /**
         * Encodes the specified MessageFormGuild message, length delimited. Does not implicitly {@link types.MessageFormGuild.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageFormGuild
         * @static
         * @param {types.IMessageFormGuild} message MessageFormGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageFormGuild.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageFormGuild message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageFormGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageFormGuild} MessageFormGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageFormGuild.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageFormGuild();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.creatorAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.description = reader.string();
                        break;
                    }
                case 4: {
                        message.minTrust = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageFormGuild message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageFormGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageFormGuild} MessageFormGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageFormGuild.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageFormGuild message.
         * @function verify
         * @memberof types.MessageFormGuild
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageFormGuild.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.creatorAddress != null && message.hasOwnProperty("creatorAddress"))
                if (!(message.creatorAddress && typeof message.creatorAddress.length === "number" || $util.isString(message.creatorAddress)))
                    return "creatorAddress: buffer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.minTrust != null && message.hasOwnProperty("minTrust"))
                if (!$util.isInteger(message.minTrust) && !(message.minTrust && $util.isInteger(message.minTrust.low) && $util.isInteger(message.minTrust.high)))
                    return "minTrust: integer|Long expected";
            return null;
        };

        /**
         * Creates a MessageFormGuild message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageFormGuild
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageFormGuild} MessageFormGuild
         */
        MessageFormGuild.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessageFormGuild)
                return object;
            var message = new $root.types.MessageFormGuild();
            if (object.creatorAddress != null)
                if (typeof object.creatorAddress === "string")
                    $util.base64.decode(object.creatorAddress, message.creatorAddress = $util.newBuffer($util.base64.length(object.creatorAddress)), 0);
                else if (object.creatorAddress.length >= 0)
                    message.creatorAddress = object.creatorAddress;
            if (object.name != null)
                message.name = String(object.name);
            if (object.description != null)
                message.description = String(object.description);
            if (object.minTrust != null)
                if ($util.Long)
                    (message.minTrust = $util.Long.fromValue(object.minTrust)).unsigned = true;
                else if (typeof object.minTrust === "string")
                    message.minTrust = parseInt(object.minTrust, 10);
                else if (typeof object.minTrust === "number")
                    message.minTrust = object.minTrust;
                else if (typeof object.minTrust === "object")
                    message.minTrust = new $util.LongBits(object.minTrust.low >>> 0, object.minTrust.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a MessageFormGuild message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageFormGuild
         * @static
         * @param {types.MessageFormGuild} message MessageFormGuild
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageFormGuild.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.creatorAddress = "";
                else {
                    object.creatorAddress = [];
                    if (options.bytes !== Array)
                        object.creatorAddress = $util.newBuffer(object.creatorAddress);
                }
                object.name = "";
                object.description = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.minTrust = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.minTrust = options.longs === String ? "0" : 0;
            }
            if (message.creatorAddress != null && message.hasOwnProperty("creatorAddress"))
                object.creatorAddress = options.bytes === String ? $util.base64.encode(message.creatorAddress, 0, message.creatorAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.creatorAddress) : message.creatorAddress;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.minTrust != null && message.hasOwnProperty("minTrust"))
                if (typeof message.minTrust === "number")
                    object.minTrust = options.longs === String ? String(message.minTrust) : message.minTrust;
                else
                    object.minTrust = options.longs === String ? $util.Long.prototype.toString.call(message.minTrust) : options.longs === Number ? new $util.LongBits(message.minTrust.low >>> 0, message.minTrust.high >>> 0).toNumber(true) : message.minTrust;
            return object;
        };

        /**
         * Converts this MessageFormGuild to JSON.
         * @function toJSON
         * @memberof types.MessageFormGuild
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageFormGuild.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageFormGuild
         * @function getTypeUrl
         * @memberof types.MessageFormGuild
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageFormGuild.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageFormGuild";
        };

        return MessageFormGuild;
    })();

    types.MessageJoinGuild = (function() {

        /**
         * Properties of a MessageJoinGuild.
         * @memberof types
         * @interface IMessageJoinGuild
         * @property {Uint8Array|null} [memberAddress] MessageJoinGuild memberAddress
         * @property {number|Long|null} [guildId] MessageJoinGuild guildId
         */

        /**
         * Constructs a new MessageJoinGuild.
         * @memberof types
         * @classdesc Represents a MessageJoinGuild.
         * @implements IMessageJoinGuild
         * @constructor
         * @param {types.IMessageJoinGuild=} [properties] Properties to set
         */
        function MessageJoinGuild(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageJoinGuild memberAddress.
         * @member {Uint8Array} memberAddress
         * @memberof types.MessageJoinGuild
         * @instance
         */
        MessageJoinGuild.prototype.memberAddress = $util.newBuffer([]);

        /**
         * MessageJoinGuild guildId.
         * @member {number|Long} guildId
         * @memberof types.MessageJoinGuild
         * @instance
         */
        MessageJoinGuild.prototype.guildId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new MessageJoinGuild instance using the specified properties.
         * @function create
         * @memberof types.MessageJoinGuild
         * @static
         * @param {types.IMessageJoinGuild=} [properties] Properties to set
         * @returns {types.MessageJoinGuild} MessageJoinGuild instance
         */
        MessageJoinGuild.create = function create(properties) {
            return new MessageJoinGuild(properties);
        };

        /**
         * Encodes the specified MessageJoinGuild message. Does not implicitly {@link types.MessageJoinGuild.verify|verify} messages.
         * @function encode
         * @memberof types.MessageJoinGuild
         * @static
         * @param {types.IMessageJoinGuild} message MessageJoinGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageJoinGuild.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.memberAddress != null && Object.hasOwnProperty.call(message, "memberAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.memberAddress);
            if (message.guildId != null && Object.hasOwnProperty.call(message, "guildId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.guildId);
            return writer;
        };

        /**
         * Encodes the specified MessageJoinGuild message, length delimited. Does not implicitly {@link types.MessageJoinGuild.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageJoinGuild
         * @static
         * @param {types.IMessageJoinGuild} message MessageJoinGuild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageJoinGuild.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageJoinGuild message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageJoinGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageJoinGuild} MessageJoinGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageJoinGuild.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageJoinGuild();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.memberAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.guildId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageJoinGuild message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageJoinGuild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageJoinGuild} MessageJoinGuild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageJoinGuild.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageJoinGuild message.
         * @function verify
         * @memberof types.MessageJoinGuild
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageJoinGuild.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.memberAddress != null && message.hasOwnProperty("memberAddress"))
                if (!(message.memberAddress && typeof message.memberAddress.length === "number" || $util.isString(message.memberAddress)))
                    return "memberAddress: buffer expected";
            if (message.guildId != null && message.hasOwnProperty("guildId"))
                if (!$util.isInteger(message.guildId) && !(message.guildId && $util.isInteger(message.guildId.low) && $util.isInteger(message.guildId.high)))
                    return "guildId: integer|Long expected";
            return null;
        };

        /**
         * Creates a MessageJoinGuild message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageJoinGuild
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageJoinGuild} MessageJoinGuild
         */
        MessageJoinGuild.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessageJoinGuild)
                return object;
            var message = new $root.types.MessageJoinGuild();
            if (object.memberAddress != null)
                if (typeof object.memberAddress === "string")
                    $util.base64.decode(object.memberAddress, message.memberAddress = $util.newBuffer($util.base64.length(object.memberAddress)), 0);
                else if (object.memberAddress.length >= 0)
                    message.memberAddress = object.memberAddress;
            if (object.guildId != null)
                if ($util.Long)
                    (message.guildId = $util.Long.fromValue(object.guildId)).unsigned = true;
                else if (typeof object.guildId === "string")
                    message.guildId = parseInt(object.guildId, 10);
                else if (typeof object.guildId === "number")
                    message.guildId = object.guildId;
                else if (typeof object.guildId === "object")
                    message.guildId = new $util.LongBits(object.guildId.low >>> 0, object.guildId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a MessageJoinGuild message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageJoinGuild
         * @static
         * @param {types.MessageJoinGuild} message MessageJoinGuild
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageJoinGuild.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.memberAddress = "";
                else {
                    object.memberAddress = [];
                    if (options.bytes !== Array)
                        object.memberAddress = $util.newBuffer(object.memberAddress);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.guildId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.guildId = options.longs === String ? "0" : 0;
            }
            if (message.memberAddress != null && message.hasOwnProperty("memberAddress"))
                object.memberAddress = options.bytes === String ? $util.base64.encode(message.memberAddress, 0, message.memberAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.memberAddress) : message.memberAddress;
            if (message.guildId != null && message.hasOwnProperty("guildId"))
                if (typeof message.guildId === "number")
                    object.guildId = options.longs === String ? String(message.guildId) : message.guildId;
                else
                    object.guildId = options.longs === String ? $util.Long.prototype.toString.call(message.guildId) : options.longs === Number ? new $util.LongBits(message.guildId.low >>> 0, message.guildId.high >>> 0).toNumber(true) : message.guildId;
            return object;
        };

        /**
         * Converts this MessageJoinGuild to JSON.
         * @function toJSON
         * @memberof types.MessageJoinGuild
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageJoinGuild.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageJoinGuild
         * @function getTypeUrl
         * @memberof types.MessageJoinGuild
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageJoinGuild.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageJoinGuild";
        };

        return MessageJoinGuild;
    })();

    types.MessagePostQuest = (function() {

        /**
         * Properties of a MessagePostQuest.
         * @memberof types
         * @interface IMessagePostQuest
         * @property {Uint8Array|null} [authorAddress] MessagePostQuest authorAddress
         * @property {number|Long|null} [guildId] MessagePostQuest guildId
         * @property {string|null} [title] MessagePostQuest title
         * @property {string|null} [description] MessagePostQuest description
         * @property {number|Long|null} [reward] MessagePostQuest reward
         */

        /**
         * Constructs a new MessagePostQuest.
         * @memberof types
         * @classdesc Represents a MessagePostQuest.
         * @implements IMessagePostQuest
         * @constructor
         * @param {types.IMessagePostQuest=} [properties] Properties to set
         */
        function MessagePostQuest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessagePostQuest authorAddress.
         * @member {Uint8Array} authorAddress
         * @memberof types.MessagePostQuest
         * @instance
         */
        MessagePostQuest.prototype.authorAddress = $util.newBuffer([]);

        /**
         * MessagePostQuest guildId.
         * @member {number|Long} guildId
         * @memberof types.MessagePostQuest
         * @instance
         */
        MessagePostQuest.prototype.guildId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MessagePostQuest title.
         * @member {string} title
         * @memberof types.MessagePostQuest
         * @instance
         */
        MessagePostQuest.prototype.title = "";

        /**
         * MessagePostQuest description.
         * @member {string} description
         * @memberof types.MessagePostQuest
         * @instance
         */
        MessagePostQuest.prototype.description = "";

        /**
         * MessagePostQuest reward.
         * @member {number|Long} reward
         * @memberof types.MessagePostQuest
         * @instance
         */
        MessagePostQuest.prototype.reward = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new MessagePostQuest instance using the specified properties.
         * @function create
         * @memberof types.MessagePostQuest
         * @static
         * @param {types.IMessagePostQuest=} [properties] Properties to set
         * @returns {types.MessagePostQuest} MessagePostQuest instance
         */
        MessagePostQuest.create = function create(properties) {
            return new MessagePostQuest(properties);
        };

        /**
         * Encodes the specified MessagePostQuest message. Does not implicitly {@link types.MessagePostQuest.verify|verify} messages.
         * @function encode
         * @memberof types.MessagePostQuest
         * @static
         * @param {types.IMessagePostQuest} message MessagePostQuest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessagePostQuest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.authorAddress != null && Object.hasOwnProperty.call(message, "authorAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.authorAddress);
            if (message.guildId != null && Object.hasOwnProperty.call(message, "guildId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.guildId);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.title);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.reward);
            return writer;
        };

        /**
         * Encodes the specified MessagePostQuest message, length delimited. Does not implicitly {@link types.MessagePostQuest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessagePostQuest
         * @static
         * @param {types.IMessagePostQuest} message MessagePostQuest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessagePostQuest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessagePostQuest message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessagePostQuest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessagePostQuest} MessagePostQuest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessagePostQuest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessagePostQuest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.authorAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.guildId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.title = reader.string();
                        break;
                    }
                case 4: {
                        message.description = reader.string();
                        break;
                    }
                case 5: {
                        message.reward = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessagePostQuest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessagePostQuest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessagePostQuest} MessagePostQuest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessagePostQuest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessagePostQuest message.
         * @function verify
         * @memberof types.MessagePostQuest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessagePostQuest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.authorAddress != null && message.hasOwnProperty("authorAddress"))
                if (!(message.authorAddress && typeof message.authorAddress.length === "number" || $util.isString(message.authorAddress)))
                    return "authorAddress: buffer expected";
            if (message.guildId != null && message.hasOwnProperty("guildId"))
                if (!$util.isInteger(message.guildId) && !(message.guildId && $util.isInteger(message.guildId.low) && $util.isInteger(message.guildId.high)))
                    return "guildId: integer|Long expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.reward != null && message.hasOwnProperty("reward"))
                if (!$util.isInteger(message.reward) && !(message.reward && $util.isInteger(message.reward.low) && $util.isInteger(message.reward.high)))
                    return "reward: integer|Long expected";
            return null;
        };

        /**
         * Creates a MessagePostQuest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessagePostQuest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessagePostQuest} MessagePostQuest
         */
        MessagePostQuest.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessagePostQuest)
                return object;
            var message = new $root.types.MessagePostQuest();
            if (object.authorAddress != null)
                if (typeof object.authorAddress === "string")
                    $util.base64.decode(object.authorAddress, message.authorAddress = $util.newBuffer($util.base64.length(object.authorAddress)), 0);
                else if (object.authorAddress.length >= 0)
                    message.authorAddress = object.authorAddress;
            if (object.guildId != null)
                if ($util.Long)
                    (message.guildId = $util.Long.fromValue(object.guildId)).unsigned = true;
                else if (typeof object.guildId === "string")
                    message.guildId = parseInt(object.guildId, 10);
                else if (typeof object.guildId === "number")
                    message.guildId = object.guildId;
                else if (typeof object.guildId === "object")
                    message.guildId = new $util.LongBits(object.guildId.low >>> 0, object.guildId.high >>> 0).toNumber(true);
            if (object.title != null)
                message.title = String(object.title);
            if (object.description != null)
                message.description = String(object.description);
            if (object.reward != null)
                if ($util.Long)
                    (message.reward = $util.Long.fromValue(object.reward)).unsigned = true;
                else if (typeof object.reward === "string")
                    message.reward = parseInt(object.reward, 10);
                else if (typeof object.reward === "number")
                    message.reward = object.reward;
                else if (typeof object.reward === "object")
                    message.reward = new $util.LongBits(object.reward.low >>> 0, object.reward.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a MessagePostQuest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessagePostQuest
         * @static
         * @param {types.MessagePostQuest} message MessagePostQuest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessagePostQuest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.authorAddress = "";
                else {
                    object.authorAddress = [];
                    if (options.bytes !== Array)
                        object.authorAddress = $util.newBuffer(object.authorAddress);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.guildId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.guildId = options.longs === String ? "0" : 0;
                object.title = "";
                object.description = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.reward = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.reward = options.longs === String ? "0" : 0;
            }
            if (message.authorAddress != null && message.hasOwnProperty("authorAddress"))
                object.authorAddress = options.bytes === String ? $util.base64.encode(message.authorAddress, 0, message.authorAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.authorAddress) : message.authorAddress;
            if (message.guildId != null && message.hasOwnProperty("guildId"))
                if (typeof message.guildId === "number")
                    object.guildId = options.longs === String ? String(message.guildId) : message.guildId;
                else
                    object.guildId = options.longs === String ? $util.Long.prototype.toString.call(message.guildId) : options.longs === Number ? new $util.LongBits(message.guildId.low >>> 0, message.guildId.high >>> 0).toNumber(true) : message.guildId;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.reward != null && message.hasOwnProperty("reward"))
                if (typeof message.reward === "number")
                    object.reward = options.longs === String ? String(message.reward) : message.reward;
                else
                    object.reward = options.longs === String ? $util.Long.prototype.toString.call(message.reward) : options.longs === Number ? new $util.LongBits(message.reward.low >>> 0, message.reward.high >>> 0).toNumber(true) : message.reward;
            return object;
        };

        /**
         * Converts this MessagePostQuest to JSON.
         * @function toJSON
         * @memberof types.MessagePostQuest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessagePostQuest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessagePostQuest
         * @function getTypeUrl
         * @memberof types.MessagePostQuest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessagePostQuest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessagePostQuest";
        };

        return MessagePostQuest;
    })();

    types.MessageSubmitProof = (function() {

        /**
         * Properties of a MessageSubmitProof.
         * @memberof types
         * @interface IMessageSubmitProof
         * @property {Uint8Array|null} [authorAddress] MessageSubmitProof authorAddress
         * @property {number|Long|null} [questId] MessageSubmitProof questId
         * @property {string|null} [proofUri] MessageSubmitProof proofUri
         */

        /**
         * Constructs a new MessageSubmitProof.
         * @memberof types
         * @classdesc Represents a MessageSubmitProof.
         * @implements IMessageSubmitProof
         * @constructor
         * @param {types.IMessageSubmitProof=} [properties] Properties to set
         */
        function MessageSubmitProof(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageSubmitProof authorAddress.
         * @member {Uint8Array} authorAddress
         * @memberof types.MessageSubmitProof
         * @instance
         */
        MessageSubmitProof.prototype.authorAddress = $util.newBuffer([]);

        /**
         * MessageSubmitProof questId.
         * @member {number|Long} questId
         * @memberof types.MessageSubmitProof
         * @instance
         */
        MessageSubmitProof.prototype.questId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MessageSubmitProof proofUri.
         * @member {string} proofUri
         * @memberof types.MessageSubmitProof
         * @instance
         */
        MessageSubmitProof.prototype.proofUri = "";

        /**
         * Creates a new MessageSubmitProof instance using the specified properties.
         * @function create
         * @memberof types.MessageSubmitProof
         * @static
         * @param {types.IMessageSubmitProof=} [properties] Properties to set
         * @returns {types.MessageSubmitProof} MessageSubmitProof instance
         */
        MessageSubmitProof.create = function create(properties) {
            return new MessageSubmitProof(properties);
        };

        /**
         * Encodes the specified MessageSubmitProof message. Does not implicitly {@link types.MessageSubmitProof.verify|verify} messages.
         * @function encode
         * @memberof types.MessageSubmitProof
         * @static
         * @param {types.IMessageSubmitProof} message MessageSubmitProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageSubmitProof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.authorAddress != null && Object.hasOwnProperty.call(message, "authorAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.authorAddress);
            if (message.questId != null && Object.hasOwnProperty.call(message, "questId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.questId);
            if (message.proofUri != null && Object.hasOwnProperty.call(message, "proofUri"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.proofUri);
            return writer;
        };

        /**
         * Encodes the specified MessageSubmitProof message, length delimited. Does not implicitly {@link types.MessageSubmitProof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageSubmitProof
         * @static
         * @param {types.IMessageSubmitProof} message MessageSubmitProof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageSubmitProof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageSubmitProof message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageSubmitProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageSubmitProof} MessageSubmitProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageSubmitProof.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageSubmitProof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.authorAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.questId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.proofUri = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageSubmitProof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageSubmitProof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageSubmitProof} MessageSubmitProof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageSubmitProof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageSubmitProof message.
         * @function verify
         * @memberof types.MessageSubmitProof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageSubmitProof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.authorAddress != null && message.hasOwnProperty("authorAddress"))
                if (!(message.authorAddress && typeof message.authorAddress.length === "number" || $util.isString(message.authorAddress)))
                    return "authorAddress: buffer expected";
            if (message.questId != null && message.hasOwnProperty("questId"))
                if (!$util.isInteger(message.questId) && !(message.questId && $util.isInteger(message.questId.low) && $util.isInteger(message.questId.high)))
                    return "questId: integer|Long expected";
            if (message.proofUri != null && message.hasOwnProperty("proofUri"))
                if (!$util.isString(message.proofUri))
                    return "proofUri: string expected";
            return null;
        };

        /**
         * Creates a MessageSubmitProof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageSubmitProof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageSubmitProof} MessageSubmitProof
         */
        MessageSubmitProof.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessageSubmitProof)
                return object;
            var message = new $root.types.MessageSubmitProof();
            if (object.authorAddress != null)
                if (typeof object.authorAddress === "string")
                    $util.base64.decode(object.authorAddress, message.authorAddress = $util.newBuffer($util.base64.length(object.authorAddress)), 0);
                else if (object.authorAddress.length >= 0)
                    message.authorAddress = object.authorAddress;
            if (object.questId != null)
                if ($util.Long)
                    (message.questId = $util.Long.fromValue(object.questId)).unsigned = true;
                else if (typeof object.questId === "string")
                    message.questId = parseInt(object.questId, 10);
                else if (typeof object.questId === "number")
                    message.questId = object.questId;
                else if (typeof object.questId === "object")
                    message.questId = new $util.LongBits(object.questId.low >>> 0, object.questId.high >>> 0).toNumber(true);
            if (object.proofUri != null)
                message.proofUri = String(object.proofUri);
            return message;
        };

        /**
         * Creates a plain object from a MessageSubmitProof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageSubmitProof
         * @static
         * @param {types.MessageSubmitProof} message MessageSubmitProof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageSubmitProof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.authorAddress = "";
                else {
                    object.authorAddress = [];
                    if (options.bytes !== Array)
                        object.authorAddress = $util.newBuffer(object.authorAddress);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.questId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.questId = options.longs === String ? "0" : 0;
                object.proofUri = "";
            }
            if (message.authorAddress != null && message.hasOwnProperty("authorAddress"))
                object.authorAddress = options.bytes === String ? $util.base64.encode(message.authorAddress, 0, message.authorAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.authorAddress) : message.authorAddress;
            if (message.questId != null && message.hasOwnProperty("questId"))
                if (typeof message.questId === "number")
                    object.questId = options.longs === String ? String(message.questId) : message.questId;
                else
                    object.questId = options.longs === String ? $util.Long.prototype.toString.call(message.questId) : options.longs === Number ? new $util.LongBits(message.questId.low >>> 0, message.questId.high >>> 0).toNumber(true) : message.questId;
            if (message.proofUri != null && message.hasOwnProperty("proofUri"))
                object.proofUri = message.proofUri;
            return object;
        };

        /**
         * Converts this MessageSubmitProof to JSON.
         * @function toJSON
         * @memberof types.MessageSubmitProof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageSubmitProof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageSubmitProof
         * @function getTypeUrl
         * @memberof types.MessageSubmitProof
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageSubmitProof.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageSubmitProof";
        };

        return MessageSubmitProof;
    })();

    types.MessageAttestContribution = (function() {

        /**
         * Properties of a MessageAttestContribution.
         * @memberof types
         * @interface IMessageAttestContribution
         * @property {Uint8Array|null} [reviewerAddress] MessageAttestContribution reviewerAddress
         * @property {number|Long|null} [proofId] MessageAttestContribution proofId
         * @property {boolean|null} [approved] MessageAttestContribution approved
         */

        /**
         * Constructs a new MessageAttestContribution.
         * @memberof types
         * @classdesc Represents a MessageAttestContribution.
         * @implements IMessageAttestContribution
         * @constructor
         * @param {types.IMessageAttestContribution=} [properties] Properties to set
         */
        function MessageAttestContribution(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageAttestContribution reviewerAddress.
         * @member {Uint8Array} reviewerAddress
         * @memberof types.MessageAttestContribution
         * @instance
         */
        MessageAttestContribution.prototype.reviewerAddress = $util.newBuffer([]);

        /**
         * MessageAttestContribution proofId.
         * @member {number|Long} proofId
         * @memberof types.MessageAttestContribution
         * @instance
         */
        MessageAttestContribution.prototype.proofId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MessageAttestContribution approved.
         * @member {boolean} approved
         * @memberof types.MessageAttestContribution
         * @instance
         */
        MessageAttestContribution.prototype.approved = false;

        /**
         * Creates a new MessageAttestContribution instance using the specified properties.
         * @function create
         * @memberof types.MessageAttestContribution
         * @static
         * @param {types.IMessageAttestContribution=} [properties] Properties to set
         * @returns {types.MessageAttestContribution} MessageAttestContribution instance
         */
        MessageAttestContribution.create = function create(properties) {
            return new MessageAttestContribution(properties);
        };

        /**
         * Encodes the specified MessageAttestContribution message. Does not implicitly {@link types.MessageAttestContribution.verify|verify} messages.
         * @function encode
         * @memberof types.MessageAttestContribution
         * @static
         * @param {types.IMessageAttestContribution} message MessageAttestContribution message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageAttestContribution.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reviewerAddress != null && Object.hasOwnProperty.call(message, "reviewerAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.reviewerAddress);
            if (message.proofId != null && Object.hasOwnProperty.call(message, "proofId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.proofId);
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.approved);
            return writer;
        };

        /**
         * Encodes the specified MessageAttestContribution message, length delimited. Does not implicitly {@link types.MessageAttestContribution.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageAttestContribution
         * @static
         * @param {types.IMessageAttestContribution} message MessageAttestContribution message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageAttestContribution.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageAttestContribution message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageAttestContribution
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageAttestContribution} MessageAttestContribution
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageAttestContribution.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageAttestContribution();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.reviewerAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.proofId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.approved = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageAttestContribution message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageAttestContribution
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageAttestContribution} MessageAttestContribution
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageAttestContribution.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageAttestContribution message.
         * @function verify
         * @memberof types.MessageAttestContribution
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageAttestContribution.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reviewerAddress != null && message.hasOwnProperty("reviewerAddress"))
                if (!(message.reviewerAddress && typeof message.reviewerAddress.length === "number" || $util.isString(message.reviewerAddress)))
                    return "reviewerAddress: buffer expected";
            if (message.proofId != null && message.hasOwnProperty("proofId"))
                if (!$util.isInteger(message.proofId) && !(message.proofId && $util.isInteger(message.proofId.low) && $util.isInteger(message.proofId.high)))
                    return "proofId: integer|Long expected";
            if (message.approved != null && message.hasOwnProperty("approved"))
                if (typeof message.approved !== "boolean")
                    return "approved: boolean expected";
            return null;
        };

        /**
         * Creates a MessageAttestContribution message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageAttestContribution
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageAttestContribution} MessageAttestContribution
         */
        MessageAttestContribution.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessageAttestContribution)
                return object;
            var message = new $root.types.MessageAttestContribution();
            if (object.reviewerAddress != null)
                if (typeof object.reviewerAddress === "string")
                    $util.base64.decode(object.reviewerAddress, message.reviewerAddress = $util.newBuffer($util.base64.length(object.reviewerAddress)), 0);
                else if (object.reviewerAddress.length >= 0)
                    message.reviewerAddress = object.reviewerAddress;
            if (object.proofId != null)
                if ($util.Long)
                    (message.proofId = $util.Long.fromValue(object.proofId)).unsigned = true;
                else if (typeof object.proofId === "string")
                    message.proofId = parseInt(object.proofId, 10);
                else if (typeof object.proofId === "number")
                    message.proofId = object.proofId;
                else if (typeof object.proofId === "object")
                    message.proofId = new $util.LongBits(object.proofId.low >>> 0, object.proofId.high >>> 0).toNumber(true);
            if (object.approved != null)
                message.approved = Boolean(object.approved);
            return message;
        };

        /**
         * Creates a plain object from a MessageAttestContribution message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageAttestContribution
         * @static
         * @param {types.MessageAttestContribution} message MessageAttestContribution
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageAttestContribution.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.reviewerAddress = "";
                else {
                    object.reviewerAddress = [];
                    if (options.bytes !== Array)
                        object.reviewerAddress = $util.newBuffer(object.reviewerAddress);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.proofId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.proofId = options.longs === String ? "0" : 0;
                object.approved = false;
            }
            if (message.reviewerAddress != null && message.hasOwnProperty("reviewerAddress"))
                object.reviewerAddress = options.bytes === String ? $util.base64.encode(message.reviewerAddress, 0, message.reviewerAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.reviewerAddress) : message.reviewerAddress;
            if (message.proofId != null && message.hasOwnProperty("proofId"))
                if (typeof message.proofId === "number")
                    object.proofId = options.longs === String ? String(message.proofId) : message.proofId;
                else
                    object.proofId = options.longs === String ? $util.Long.prototype.toString.call(message.proofId) : options.longs === Number ? new $util.LongBits(message.proofId.low >>> 0, message.proofId.high >>> 0).toNumber(true) : message.proofId;
            if (message.approved != null && message.hasOwnProperty("approved"))
                object.approved = message.approved;
            return object;
        };

        /**
         * Converts this MessageAttestContribution to JSON.
         * @function toJSON
         * @memberof types.MessageAttestContribution
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageAttestContribution.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageAttestContribution
         * @function getTypeUrl
         * @memberof types.MessageAttestContribution
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageAttestContribution.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageAttestContribution";
        };

        return MessageAttestContribution;
    })();

    types.MessageCastWeightedVote = (function() {

        /**
         * Properties of a MessageCastWeightedVote.
         * @memberof types
         * @interface IMessageCastWeightedVote
         * @property {Uint8Array|null} [voterAddress] MessageCastWeightedVote voterAddress
         * @property {string|null} [proposalId] MessageCastWeightedVote proposalId
         * @property {string|null} [title] MessageCastWeightedVote title
         * @property {boolean|null} [choice] MessageCastWeightedVote choice
         */

        /**
         * Constructs a new MessageCastWeightedVote.
         * @memberof types
         * @classdesc Represents a MessageCastWeightedVote.
         * @implements IMessageCastWeightedVote
         * @constructor
         * @param {types.IMessageCastWeightedVote=} [properties] Properties to set
         */
        function MessageCastWeightedVote(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageCastWeightedVote voterAddress.
         * @member {Uint8Array} voterAddress
         * @memberof types.MessageCastWeightedVote
         * @instance
         */
        MessageCastWeightedVote.prototype.voterAddress = $util.newBuffer([]);

        /**
         * MessageCastWeightedVote proposalId.
         * @member {string} proposalId
         * @memberof types.MessageCastWeightedVote
         * @instance
         */
        MessageCastWeightedVote.prototype.proposalId = "";

        /**
         * MessageCastWeightedVote title.
         * @member {string} title
         * @memberof types.MessageCastWeightedVote
         * @instance
         */
        MessageCastWeightedVote.prototype.title = "";

        /**
         * MessageCastWeightedVote choice.
         * @member {boolean} choice
         * @memberof types.MessageCastWeightedVote
         * @instance
         */
        MessageCastWeightedVote.prototype.choice = false;

        /**
         * Creates a new MessageCastWeightedVote instance using the specified properties.
         * @function create
         * @memberof types.MessageCastWeightedVote
         * @static
         * @param {types.IMessageCastWeightedVote=} [properties] Properties to set
         * @returns {types.MessageCastWeightedVote} MessageCastWeightedVote instance
         */
        MessageCastWeightedVote.create = function create(properties) {
            return new MessageCastWeightedVote(properties);
        };

        /**
         * Encodes the specified MessageCastWeightedVote message. Does not implicitly {@link types.MessageCastWeightedVote.verify|verify} messages.
         * @function encode
         * @memberof types.MessageCastWeightedVote
         * @static
         * @param {types.IMessageCastWeightedVote} message MessageCastWeightedVote message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageCastWeightedVote.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.voterAddress != null && Object.hasOwnProperty.call(message, "voterAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.voterAddress);
            if (message.proposalId != null && Object.hasOwnProperty.call(message, "proposalId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.proposalId);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.title);
            if (message.choice != null && Object.hasOwnProperty.call(message, "choice"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.choice);
            return writer;
        };

        /**
         * Encodes the specified MessageCastWeightedVote message, length delimited. Does not implicitly {@link types.MessageCastWeightedVote.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.MessageCastWeightedVote
         * @static
         * @param {types.IMessageCastWeightedVote} message MessageCastWeightedVote message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageCastWeightedVote.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageCastWeightedVote message from the specified reader or buffer.
         * @function decode
         * @memberof types.MessageCastWeightedVote
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.MessageCastWeightedVote} MessageCastWeightedVote
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageCastWeightedVote.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.MessageCastWeightedVote();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.voterAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.proposalId = reader.string();
                        break;
                    }
                case 3: {
                        message.title = reader.string();
                        break;
                    }
                case 4: {
                        message.choice = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageCastWeightedVote message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.MessageCastWeightedVote
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.MessageCastWeightedVote} MessageCastWeightedVote
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageCastWeightedVote.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageCastWeightedVote message.
         * @function verify
         * @memberof types.MessageCastWeightedVote
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageCastWeightedVote.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.voterAddress != null && message.hasOwnProperty("voterAddress"))
                if (!(message.voterAddress && typeof message.voterAddress.length === "number" || $util.isString(message.voterAddress)))
                    return "voterAddress: buffer expected";
            if (message.proposalId != null && message.hasOwnProperty("proposalId"))
                if (!$util.isString(message.proposalId))
                    return "proposalId: string expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.choice != null && message.hasOwnProperty("choice"))
                if (typeof message.choice !== "boolean")
                    return "choice: boolean expected";
            return null;
        };

        /**
         * Creates a MessageCastWeightedVote message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.MessageCastWeightedVote
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.MessageCastWeightedVote} MessageCastWeightedVote
         */
        MessageCastWeightedVote.fromObject = function fromObject(object) {
            if (object instanceof $root.types.MessageCastWeightedVote)
                return object;
            var message = new $root.types.MessageCastWeightedVote();
            if (object.voterAddress != null)
                if (typeof object.voterAddress === "string")
                    $util.base64.decode(object.voterAddress, message.voterAddress = $util.newBuffer($util.base64.length(object.voterAddress)), 0);
                else if (object.voterAddress.length >= 0)
                    message.voterAddress = object.voterAddress;
            if (object.proposalId != null)
                message.proposalId = String(object.proposalId);
            if (object.title != null)
                message.title = String(object.title);
            if (object.choice != null)
                message.choice = Boolean(object.choice);
            return message;
        };

        /**
         * Creates a plain object from a MessageCastWeightedVote message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.MessageCastWeightedVote
         * @static
         * @param {types.MessageCastWeightedVote} message MessageCastWeightedVote
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageCastWeightedVote.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.voterAddress = "";
                else {
                    object.voterAddress = [];
                    if (options.bytes !== Array)
                        object.voterAddress = $util.newBuffer(object.voterAddress);
                }
                object.proposalId = "";
                object.title = "";
                object.choice = false;
            }
            if (message.voterAddress != null && message.hasOwnProperty("voterAddress"))
                object.voterAddress = options.bytes === String ? $util.base64.encode(message.voterAddress, 0, message.voterAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.voterAddress) : message.voterAddress;
            if (message.proposalId != null && message.hasOwnProperty("proposalId"))
                object.proposalId = message.proposalId;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.choice != null && message.hasOwnProperty("choice"))
                object.choice = message.choice;
            return object;
        };

        /**
         * Converts this MessageCastWeightedVote to JSON.
         * @function toJSON
         * @memberof types.MessageCastWeightedVote
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageCastWeightedVote.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageCastWeightedVote
         * @function getTypeUrl
         * @memberof types.MessageCastWeightedVote
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageCastWeightedVote.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.MessageCastWeightedVote";
        };

        return MessageCastWeightedVote;
    })();

    types.Identity = (function() {

        /**
         * Properties of an Identity.
         * @memberof types
         * @interface IIdentity
         * @property {Uint8Array|null} [address] Identity address
         * @property {string|null} [handle] Identity handle
         * @property {string|null} [bio] Identity bio
         * @property {number|Long|null} [registeredHeight] Identity registeredHeight
         * @property {number|Long|null} [trustScore] Identity trustScore
         * @property {number|Long|null} [inDegree] Identity inDegree
         * @property {number|Long|null} [outDegree] Identity outDegree
         * @property {number|Long|null} [stakedInbound] Identity stakedInbound
         */

        /**
         * Constructs a new Identity.
         * @memberof types
         * @classdesc Represents an Identity.
         * @implements IIdentity
         * @constructor
         * @param {types.IIdentity=} [properties] Properties to set
         */
        function Identity(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Identity address.
         * @member {Uint8Array} address
         * @memberof types.Identity
         * @instance
         */
        Identity.prototype.address = $util.newBuffer([]);

        /**
         * Identity handle.
         * @member {string} handle
         * @memberof types.Identity
         * @instance
         */
        Identity.prototype.handle = "";

        /**
         * Identity bio.
         * @member {string} bio
         * @memberof types.Identity
         * @instance
         */
        Identity.prototype.bio = "";

        /**
         * Identity registeredHeight.
         * @member {number|Long} registeredHeight
         * @memberof types.Identity
         * @instance
         */
        Identity.prototype.registeredHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Identity trustScore.
         * @member {number|Long} trustScore
         * @memberof types.Identity
         * @instance
         */
        Identity.prototype.trustScore = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Identity inDegree.
         * @member {number|Long} inDegree
         * @memberof types.Identity
         * @instance
         */
        Identity.prototype.inDegree = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Identity outDegree.
         * @member {number|Long} outDegree
         * @memberof types.Identity
         * @instance
         */
        Identity.prototype.outDegree = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Identity stakedInbound.
         * @member {number|Long} stakedInbound
         * @memberof types.Identity
         * @instance
         */
        Identity.prototype.stakedInbound = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Identity instance using the specified properties.
         * @function create
         * @memberof types.Identity
         * @static
         * @param {types.IIdentity=} [properties] Properties to set
         * @returns {types.Identity} Identity instance
         */
        Identity.create = function create(properties) {
            return new Identity(properties);
        };

        /**
         * Encodes the specified Identity message. Does not implicitly {@link types.Identity.verify|verify} messages.
         * @function encode
         * @memberof types.Identity
         * @static
         * @param {types.IIdentity} message Identity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Identity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.handle);
            if (message.bio != null && Object.hasOwnProperty.call(message, "bio"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.bio);
            if (message.registeredHeight != null && Object.hasOwnProperty.call(message, "registeredHeight"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.registeredHeight);
            if (message.trustScore != null && Object.hasOwnProperty.call(message, "trustScore"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.trustScore);
            if (message.inDegree != null && Object.hasOwnProperty.call(message, "inDegree"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.inDegree);
            if (message.outDegree != null && Object.hasOwnProperty.call(message, "outDegree"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.outDegree);
            if (message.stakedInbound != null && Object.hasOwnProperty.call(message, "stakedInbound"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.stakedInbound);
            return writer;
        };

        /**
         * Encodes the specified Identity message, length delimited. Does not implicitly {@link types.Identity.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Identity
         * @static
         * @param {types.IIdentity} message Identity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Identity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Identity message from the specified reader or buffer.
         * @function decode
         * @memberof types.Identity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Identity} Identity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Identity.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Identity();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.address = reader.bytes();
                        break;
                    }
                case 2: {
                        message.handle = reader.string();
                        break;
                    }
                case 3: {
                        message.bio = reader.string();
                        break;
                    }
                case 4: {
                        message.registeredHeight = reader.uint64();
                        break;
                    }
                case 5: {
                        message.trustScore = reader.uint64();
                        break;
                    }
                case 6: {
                        message.inDegree = reader.uint64();
                        break;
                    }
                case 7: {
                        message.outDegree = reader.uint64();
                        break;
                    }
                case 8: {
                        message.stakedInbound = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Identity message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Identity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Identity} Identity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Identity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Identity message.
         * @function verify
         * @memberof types.Identity
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Identity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.address != null && message.hasOwnProperty("address"))
                if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                    return "address: buffer expected";
            if (message.handle != null && message.hasOwnProperty("handle"))
                if (!$util.isString(message.handle))
                    return "handle: string expected";
            if (message.bio != null && message.hasOwnProperty("bio"))
                if (!$util.isString(message.bio))
                    return "bio: string expected";
            if (message.registeredHeight != null && message.hasOwnProperty("registeredHeight"))
                if (!$util.isInteger(message.registeredHeight) && !(message.registeredHeight && $util.isInteger(message.registeredHeight.low) && $util.isInteger(message.registeredHeight.high)))
                    return "registeredHeight: integer|Long expected";
            if (message.trustScore != null && message.hasOwnProperty("trustScore"))
                if (!$util.isInteger(message.trustScore) && !(message.trustScore && $util.isInteger(message.trustScore.low) && $util.isInteger(message.trustScore.high)))
                    return "trustScore: integer|Long expected";
            if (message.inDegree != null && message.hasOwnProperty("inDegree"))
                if (!$util.isInteger(message.inDegree) && !(message.inDegree && $util.isInteger(message.inDegree.low) && $util.isInteger(message.inDegree.high)))
                    return "inDegree: integer|Long expected";
            if (message.outDegree != null && message.hasOwnProperty("outDegree"))
                if (!$util.isInteger(message.outDegree) && !(message.outDegree && $util.isInteger(message.outDegree.low) && $util.isInteger(message.outDegree.high)))
                    return "outDegree: integer|Long expected";
            if (message.stakedInbound != null && message.hasOwnProperty("stakedInbound"))
                if (!$util.isInteger(message.stakedInbound) && !(message.stakedInbound && $util.isInteger(message.stakedInbound.low) && $util.isInteger(message.stakedInbound.high)))
                    return "stakedInbound: integer|Long expected";
            return null;
        };

        /**
         * Creates an Identity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Identity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Identity} Identity
         */
        Identity.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Identity)
                return object;
            var message = new $root.types.Identity();
            if (object.address != null)
                if (typeof object.address === "string")
                    $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                else if (object.address.length >= 0)
                    message.address = object.address;
            if (object.handle != null)
                message.handle = String(object.handle);
            if (object.bio != null)
                message.bio = String(object.bio);
            if (object.registeredHeight != null)
                if ($util.Long)
                    (message.registeredHeight = $util.Long.fromValue(object.registeredHeight)).unsigned = true;
                else if (typeof object.registeredHeight === "string")
                    message.registeredHeight = parseInt(object.registeredHeight, 10);
                else if (typeof object.registeredHeight === "number")
                    message.registeredHeight = object.registeredHeight;
                else if (typeof object.registeredHeight === "object")
                    message.registeredHeight = new $util.LongBits(object.registeredHeight.low >>> 0, object.registeredHeight.high >>> 0).toNumber(true);
            if (object.trustScore != null)
                if ($util.Long)
                    (message.trustScore = $util.Long.fromValue(object.trustScore)).unsigned = true;
                else if (typeof object.trustScore === "string")
                    message.trustScore = parseInt(object.trustScore, 10);
                else if (typeof object.trustScore === "number")
                    message.trustScore = object.trustScore;
                else if (typeof object.trustScore === "object")
                    message.trustScore = new $util.LongBits(object.trustScore.low >>> 0, object.trustScore.high >>> 0).toNumber(true);
            if (object.inDegree != null)
                if ($util.Long)
                    (message.inDegree = $util.Long.fromValue(object.inDegree)).unsigned = true;
                else if (typeof object.inDegree === "string")
                    message.inDegree = parseInt(object.inDegree, 10);
                else if (typeof object.inDegree === "number")
                    message.inDegree = object.inDegree;
                else if (typeof object.inDegree === "object")
                    message.inDegree = new $util.LongBits(object.inDegree.low >>> 0, object.inDegree.high >>> 0).toNumber(true);
            if (object.outDegree != null)
                if ($util.Long)
                    (message.outDegree = $util.Long.fromValue(object.outDegree)).unsigned = true;
                else if (typeof object.outDegree === "string")
                    message.outDegree = parseInt(object.outDegree, 10);
                else if (typeof object.outDegree === "number")
                    message.outDegree = object.outDegree;
                else if (typeof object.outDegree === "object")
                    message.outDegree = new $util.LongBits(object.outDegree.low >>> 0, object.outDegree.high >>> 0).toNumber(true);
            if (object.stakedInbound != null)
                if ($util.Long)
                    (message.stakedInbound = $util.Long.fromValue(object.stakedInbound)).unsigned = true;
                else if (typeof object.stakedInbound === "string")
                    message.stakedInbound = parseInt(object.stakedInbound, 10);
                else if (typeof object.stakedInbound === "number")
                    message.stakedInbound = object.stakedInbound;
                else if (typeof object.stakedInbound === "object")
                    message.stakedInbound = new $util.LongBits(object.stakedInbound.low >>> 0, object.stakedInbound.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from an Identity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Identity
         * @static
         * @param {types.Identity} message Identity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Identity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.address = "";
                else {
                    object.address = [];
                    if (options.bytes !== Array)
                        object.address = $util.newBuffer(object.address);
                }
                object.handle = "";
                object.bio = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.registeredHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.registeredHeight = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.trustScore = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.trustScore = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.inDegree = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.inDegree = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.outDegree = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.outDegree = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.stakedInbound = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.stakedInbound = options.longs === String ? "0" : 0;
            }
            if (message.address != null && message.hasOwnProperty("address"))
                object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
            if (message.handle != null && message.hasOwnProperty("handle"))
                object.handle = message.handle;
            if (message.bio != null && message.hasOwnProperty("bio"))
                object.bio = message.bio;
            if (message.registeredHeight != null && message.hasOwnProperty("registeredHeight"))
                if (typeof message.registeredHeight === "number")
                    object.registeredHeight = options.longs === String ? String(message.registeredHeight) : message.registeredHeight;
                else
                    object.registeredHeight = options.longs === String ? $util.Long.prototype.toString.call(message.registeredHeight) : options.longs === Number ? new $util.LongBits(message.registeredHeight.low >>> 0, message.registeredHeight.high >>> 0).toNumber(true) : message.registeredHeight;
            if (message.trustScore != null && message.hasOwnProperty("trustScore"))
                if (typeof message.trustScore === "number")
                    object.trustScore = options.longs === String ? String(message.trustScore) : message.trustScore;
                else
                    object.trustScore = options.longs === String ? $util.Long.prototype.toString.call(message.trustScore) : options.longs === Number ? new $util.LongBits(message.trustScore.low >>> 0, message.trustScore.high >>> 0).toNumber(true) : message.trustScore;
            if (message.inDegree != null && message.hasOwnProperty("inDegree"))
                if (typeof message.inDegree === "number")
                    object.inDegree = options.longs === String ? String(message.inDegree) : message.inDegree;
                else
                    object.inDegree = options.longs === String ? $util.Long.prototype.toString.call(message.inDegree) : options.longs === Number ? new $util.LongBits(message.inDegree.low >>> 0, message.inDegree.high >>> 0).toNumber(true) : message.inDegree;
            if (message.outDegree != null && message.hasOwnProperty("outDegree"))
                if (typeof message.outDegree === "number")
                    object.outDegree = options.longs === String ? String(message.outDegree) : message.outDegree;
                else
                    object.outDegree = options.longs === String ? $util.Long.prototype.toString.call(message.outDegree) : options.longs === Number ? new $util.LongBits(message.outDegree.low >>> 0, message.outDegree.high >>> 0).toNumber(true) : message.outDegree;
            if (message.stakedInbound != null && message.hasOwnProperty("stakedInbound"))
                if (typeof message.stakedInbound === "number")
                    object.stakedInbound = options.longs === String ? String(message.stakedInbound) : message.stakedInbound;
                else
                    object.stakedInbound = options.longs === String ? $util.Long.prototype.toString.call(message.stakedInbound) : options.longs === Number ? new $util.LongBits(message.stakedInbound.low >>> 0, message.stakedInbound.high >>> 0).toNumber(true) : message.stakedInbound;
            return object;
        };

        /**
         * Converts this Identity to JSON.
         * @function toJSON
         * @memberof types.Identity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Identity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Identity
         * @function getTypeUrl
         * @memberof types.Identity
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Identity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Identity";
        };

        return Identity;
    })();

    types.Thread = (function() {

        /**
         * Properties of a Thread.
         * @memberof types
         * @interface IThread
         * @property {Uint8Array|null} [fromAddress] Thread fromAddress
         * @property {Uint8Array|null} [toAddress] Thread toAddress
         * @property {number|Long|null} [stakeAmount] Thread stakeAmount
         * @property {string|null} [skillTag] Thread skillTag
         * @property {number|Long|null} [wovenHeight] Thread wovenHeight
         * @property {boolean|null} [active] Thread active
         */

        /**
         * Constructs a new Thread.
         * @memberof types
         * @classdesc Represents a Thread.
         * @implements IThread
         * @constructor
         * @param {types.IThread=} [properties] Properties to set
         */
        function Thread(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Thread fromAddress.
         * @member {Uint8Array} fromAddress
         * @memberof types.Thread
         * @instance
         */
        Thread.prototype.fromAddress = $util.newBuffer([]);

        /**
         * Thread toAddress.
         * @member {Uint8Array} toAddress
         * @memberof types.Thread
         * @instance
         */
        Thread.prototype.toAddress = $util.newBuffer([]);

        /**
         * Thread stakeAmount.
         * @member {number|Long} stakeAmount
         * @memberof types.Thread
         * @instance
         */
        Thread.prototype.stakeAmount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Thread skillTag.
         * @member {string} skillTag
         * @memberof types.Thread
         * @instance
         */
        Thread.prototype.skillTag = "";

        /**
         * Thread wovenHeight.
         * @member {number|Long} wovenHeight
         * @memberof types.Thread
         * @instance
         */
        Thread.prototype.wovenHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Thread active.
         * @member {boolean} active
         * @memberof types.Thread
         * @instance
         */
        Thread.prototype.active = false;

        /**
         * Creates a new Thread instance using the specified properties.
         * @function create
         * @memberof types.Thread
         * @static
         * @param {types.IThread=} [properties] Properties to set
         * @returns {types.Thread} Thread instance
         */
        Thread.create = function create(properties) {
            return new Thread(properties);
        };

        /**
         * Encodes the specified Thread message. Does not implicitly {@link types.Thread.verify|verify} messages.
         * @function encode
         * @memberof types.Thread
         * @static
         * @param {types.IThread} message Thread message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Thread.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.toAddress);
            if (message.stakeAmount != null && Object.hasOwnProperty.call(message, "stakeAmount"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.stakeAmount);
            if (message.skillTag != null && Object.hasOwnProperty.call(message, "skillTag"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.skillTag);
            if (message.wovenHeight != null && Object.hasOwnProperty.call(message, "wovenHeight"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.wovenHeight);
            if (message.active != null && Object.hasOwnProperty.call(message, "active"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.active);
            return writer;
        };

        /**
         * Encodes the specified Thread message, length delimited. Does not implicitly {@link types.Thread.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Thread
         * @static
         * @param {types.IThread} message Thread message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Thread.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Thread message from the specified reader or buffer.
         * @function decode
         * @memberof types.Thread
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Thread} Thread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Thread.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Thread();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.fromAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.toAddress = reader.bytes();
                        break;
                    }
                case 3: {
                        message.stakeAmount = reader.uint64();
                        break;
                    }
                case 4: {
                        message.skillTag = reader.string();
                        break;
                    }
                case 5: {
                        message.wovenHeight = reader.uint64();
                        break;
                    }
                case 6: {
                        message.active = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Thread message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Thread
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Thread} Thread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Thread.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Thread message.
         * @function verify
         * @memberof types.Thread
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Thread.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                if (!(message.fromAddress && typeof message.fromAddress.length === "number" || $util.isString(message.fromAddress)))
                    return "fromAddress: buffer expected";
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                if (!(message.toAddress && typeof message.toAddress.length === "number" || $util.isString(message.toAddress)))
                    return "toAddress: buffer expected";
            if (message.stakeAmount != null && message.hasOwnProperty("stakeAmount"))
                if (!$util.isInteger(message.stakeAmount) && !(message.stakeAmount && $util.isInteger(message.stakeAmount.low) && $util.isInteger(message.stakeAmount.high)))
                    return "stakeAmount: integer|Long expected";
            if (message.skillTag != null && message.hasOwnProperty("skillTag"))
                if (!$util.isString(message.skillTag))
                    return "skillTag: string expected";
            if (message.wovenHeight != null && message.hasOwnProperty("wovenHeight"))
                if (!$util.isInteger(message.wovenHeight) && !(message.wovenHeight && $util.isInteger(message.wovenHeight.low) && $util.isInteger(message.wovenHeight.high)))
                    return "wovenHeight: integer|Long expected";
            if (message.active != null && message.hasOwnProperty("active"))
                if (typeof message.active !== "boolean")
                    return "active: boolean expected";
            return null;
        };

        /**
         * Creates a Thread message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Thread
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Thread} Thread
         */
        Thread.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Thread)
                return object;
            var message = new $root.types.Thread();
            if (object.fromAddress != null)
                if (typeof object.fromAddress === "string")
                    $util.base64.decode(object.fromAddress, message.fromAddress = $util.newBuffer($util.base64.length(object.fromAddress)), 0);
                else if (object.fromAddress.length >= 0)
                    message.fromAddress = object.fromAddress;
            if (object.toAddress != null)
                if (typeof object.toAddress === "string")
                    $util.base64.decode(object.toAddress, message.toAddress = $util.newBuffer($util.base64.length(object.toAddress)), 0);
                else if (object.toAddress.length >= 0)
                    message.toAddress = object.toAddress;
            if (object.stakeAmount != null)
                if ($util.Long)
                    (message.stakeAmount = $util.Long.fromValue(object.stakeAmount)).unsigned = true;
                else if (typeof object.stakeAmount === "string")
                    message.stakeAmount = parseInt(object.stakeAmount, 10);
                else if (typeof object.stakeAmount === "number")
                    message.stakeAmount = object.stakeAmount;
                else if (typeof object.stakeAmount === "object")
                    message.stakeAmount = new $util.LongBits(object.stakeAmount.low >>> 0, object.stakeAmount.high >>> 0).toNumber(true);
            if (object.skillTag != null)
                message.skillTag = String(object.skillTag);
            if (object.wovenHeight != null)
                if ($util.Long)
                    (message.wovenHeight = $util.Long.fromValue(object.wovenHeight)).unsigned = true;
                else if (typeof object.wovenHeight === "string")
                    message.wovenHeight = parseInt(object.wovenHeight, 10);
                else if (typeof object.wovenHeight === "number")
                    message.wovenHeight = object.wovenHeight;
                else if (typeof object.wovenHeight === "object")
                    message.wovenHeight = new $util.LongBits(object.wovenHeight.low >>> 0, object.wovenHeight.high >>> 0).toNumber(true);
            if (object.active != null)
                message.active = Boolean(object.active);
            return message;
        };

        /**
         * Creates a plain object from a Thread message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Thread
         * @static
         * @param {types.Thread} message Thread
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Thread.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.fromAddress = "";
                else {
                    object.fromAddress = [];
                    if (options.bytes !== Array)
                        object.fromAddress = $util.newBuffer(object.fromAddress);
                }
                if (options.bytes === String)
                    object.toAddress = "";
                else {
                    object.toAddress = [];
                    if (options.bytes !== Array)
                        object.toAddress = $util.newBuffer(object.toAddress);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.stakeAmount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.stakeAmount = options.longs === String ? "0" : 0;
                object.skillTag = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.wovenHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.wovenHeight = options.longs === String ? "0" : 0;
                object.active = false;
            }
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                object.fromAddress = options.bytes === String ? $util.base64.encode(message.fromAddress, 0, message.fromAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.fromAddress) : message.fromAddress;
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                object.toAddress = options.bytes === String ? $util.base64.encode(message.toAddress, 0, message.toAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAddress) : message.toAddress;
            if (message.stakeAmount != null && message.hasOwnProperty("stakeAmount"))
                if (typeof message.stakeAmount === "number")
                    object.stakeAmount = options.longs === String ? String(message.stakeAmount) : message.stakeAmount;
                else
                    object.stakeAmount = options.longs === String ? $util.Long.prototype.toString.call(message.stakeAmount) : options.longs === Number ? new $util.LongBits(message.stakeAmount.low >>> 0, message.stakeAmount.high >>> 0).toNumber(true) : message.stakeAmount;
            if (message.skillTag != null && message.hasOwnProperty("skillTag"))
                object.skillTag = message.skillTag;
            if (message.wovenHeight != null && message.hasOwnProperty("wovenHeight"))
                if (typeof message.wovenHeight === "number")
                    object.wovenHeight = options.longs === String ? String(message.wovenHeight) : message.wovenHeight;
                else
                    object.wovenHeight = options.longs === String ? $util.Long.prototype.toString.call(message.wovenHeight) : options.longs === Number ? new $util.LongBits(message.wovenHeight.low >>> 0, message.wovenHeight.high >>> 0).toNumber(true) : message.wovenHeight;
            if (message.active != null && message.hasOwnProperty("active"))
                object.active = message.active;
            return object;
        };

        /**
         * Converts this Thread to JSON.
         * @function toJSON
         * @memberof types.Thread
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Thread.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Thread
         * @function getTypeUrl
         * @memberof types.Thread
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Thread.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Thread";
        };

        return Thread;
    })();

    types.Endorsement = (function() {

        /**
         * Properties of an Endorsement.
         * @memberof types
         * @interface IEndorsement
         * @property {Uint8Array|null} [fromAddress] Endorsement fromAddress
         * @property {Uint8Array|null} [toAddress] Endorsement toAddress
         * @property {string|null} [skill] Endorsement skill
         * @property {number|Long|null} [weight] Endorsement weight
         * @property {number|Long|null} [height] Endorsement height
         */

        /**
         * Constructs a new Endorsement.
         * @memberof types
         * @classdesc Represents an Endorsement.
         * @implements IEndorsement
         * @constructor
         * @param {types.IEndorsement=} [properties] Properties to set
         */
        function Endorsement(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Endorsement fromAddress.
         * @member {Uint8Array} fromAddress
         * @memberof types.Endorsement
         * @instance
         */
        Endorsement.prototype.fromAddress = $util.newBuffer([]);

        /**
         * Endorsement toAddress.
         * @member {Uint8Array} toAddress
         * @memberof types.Endorsement
         * @instance
         */
        Endorsement.prototype.toAddress = $util.newBuffer([]);

        /**
         * Endorsement skill.
         * @member {string} skill
         * @memberof types.Endorsement
         * @instance
         */
        Endorsement.prototype.skill = "";

        /**
         * Endorsement weight.
         * @member {number|Long} weight
         * @memberof types.Endorsement
         * @instance
         */
        Endorsement.prototype.weight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Endorsement height.
         * @member {number|Long} height
         * @memberof types.Endorsement
         * @instance
         */
        Endorsement.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Endorsement instance using the specified properties.
         * @function create
         * @memberof types.Endorsement
         * @static
         * @param {types.IEndorsement=} [properties] Properties to set
         * @returns {types.Endorsement} Endorsement instance
         */
        Endorsement.create = function create(properties) {
            return new Endorsement(properties);
        };

        /**
         * Encodes the specified Endorsement message. Does not implicitly {@link types.Endorsement.verify|verify} messages.
         * @function encode
         * @memberof types.Endorsement
         * @static
         * @param {types.IEndorsement} message Endorsement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Endorsement.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromAddress != null && Object.hasOwnProperty.call(message, "fromAddress"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.fromAddress);
            if (message.toAddress != null && Object.hasOwnProperty.call(message, "toAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.toAddress);
            if (message.skill != null && Object.hasOwnProperty.call(message, "skill"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.skill);
            if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.weight);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.height);
            return writer;
        };

        /**
         * Encodes the specified Endorsement message, length delimited. Does not implicitly {@link types.Endorsement.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Endorsement
         * @static
         * @param {types.IEndorsement} message Endorsement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Endorsement.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Endorsement message from the specified reader or buffer.
         * @function decode
         * @memberof types.Endorsement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Endorsement} Endorsement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Endorsement.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Endorsement();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.fromAddress = reader.bytes();
                        break;
                    }
                case 2: {
                        message.toAddress = reader.bytes();
                        break;
                    }
                case 3: {
                        message.skill = reader.string();
                        break;
                    }
                case 4: {
                        message.weight = reader.uint64();
                        break;
                    }
                case 5: {
                        message.height = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Endorsement message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Endorsement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Endorsement} Endorsement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Endorsement.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Endorsement message.
         * @function verify
         * @memberof types.Endorsement
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Endorsement.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                if (!(message.fromAddress && typeof message.fromAddress.length === "number" || $util.isString(message.fromAddress)))
                    return "fromAddress: buffer expected";
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                if (!(message.toAddress && typeof message.toAddress.length === "number" || $util.isString(message.toAddress)))
                    return "toAddress: buffer expected";
            if (message.skill != null && message.hasOwnProperty("skill"))
                if (!$util.isString(message.skill))
                    return "skill: string expected";
            if (message.weight != null && message.hasOwnProperty("weight"))
                if (!$util.isInteger(message.weight) && !(message.weight && $util.isInteger(message.weight.low) && $util.isInteger(message.weight.high)))
                    return "weight: integer|Long expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            return null;
        };

        /**
         * Creates an Endorsement message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Endorsement
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Endorsement} Endorsement
         */
        Endorsement.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Endorsement)
                return object;
            var message = new $root.types.Endorsement();
            if (object.fromAddress != null)
                if (typeof object.fromAddress === "string")
                    $util.base64.decode(object.fromAddress, message.fromAddress = $util.newBuffer($util.base64.length(object.fromAddress)), 0);
                else if (object.fromAddress.length >= 0)
                    message.fromAddress = object.fromAddress;
            if (object.toAddress != null)
                if (typeof object.toAddress === "string")
                    $util.base64.decode(object.toAddress, message.toAddress = $util.newBuffer($util.base64.length(object.toAddress)), 0);
                else if (object.toAddress.length >= 0)
                    message.toAddress = object.toAddress;
            if (object.skill != null)
                message.skill = String(object.skill);
            if (object.weight != null)
                if ($util.Long)
                    (message.weight = $util.Long.fromValue(object.weight)).unsigned = true;
                else if (typeof object.weight === "string")
                    message.weight = parseInt(object.weight, 10);
                else if (typeof object.weight === "number")
                    message.weight = object.weight;
                else if (typeof object.weight === "object")
                    message.weight = new $util.LongBits(object.weight.low >>> 0, object.weight.high >>> 0).toNumber(true);
            if (object.height != null)
                if ($util.Long)
                    (message.height = $util.Long.fromValue(object.height)).unsigned = true;
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from an Endorsement message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Endorsement
         * @static
         * @param {types.Endorsement} message Endorsement
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Endorsement.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.fromAddress = "";
                else {
                    object.fromAddress = [];
                    if (options.bytes !== Array)
                        object.fromAddress = $util.newBuffer(object.fromAddress);
                }
                if (options.bytes === String)
                    object.toAddress = "";
                else {
                    object.toAddress = [];
                    if (options.bytes !== Array)
                        object.toAddress = $util.newBuffer(object.toAddress);
                }
                object.skill = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.weight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.weight = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.height = options.longs === String ? "0" : 0;
            }
            if (message.fromAddress != null && message.hasOwnProperty("fromAddress"))
                object.fromAddress = options.bytes === String ? $util.base64.encode(message.fromAddress, 0, message.fromAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.fromAddress) : message.fromAddress;
            if (message.toAddress != null && message.hasOwnProperty("toAddress"))
                object.toAddress = options.bytes === String ? $util.base64.encode(message.toAddress, 0, message.toAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAddress) : message.toAddress;
            if (message.skill != null && message.hasOwnProperty("skill"))
                object.skill = message.skill;
            if (message.weight != null && message.hasOwnProperty("weight"))
                if (typeof message.weight === "number")
                    object.weight = options.longs === String ? String(message.weight) : message.weight;
                else
                    object.weight = options.longs === String ? $util.Long.prototype.toString.call(message.weight) : options.longs === Number ? new $util.LongBits(message.weight.low >>> 0, message.weight.high >>> 0).toNumber(true) : message.weight;
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
            return object;
        };

        /**
         * Converts this Endorsement to JSON.
         * @function toJSON
         * @memberof types.Endorsement
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Endorsement.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Endorsement
         * @function getTypeUrl
         * @memberof types.Endorsement
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Endorsement.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Endorsement";
        };

        return Endorsement;
    })();

    types.Guild = (function() {

        /**
         * Properties of a Guild.
         * @memberof types
         * @interface IGuild
         * @property {number|Long|null} [id] Guild id
         * @property {string|null} [name] Guild name
         * @property {string|null} [description] Guild description
         * @property {Uint8Array|null} [creatorAddress] Guild creatorAddress
         * @property {number|Long|null} [minTrust] Guild minTrust
         * @property {number|Long|null} [memberCount] Guild memberCount
         * @property {number|Long|null} [createdHeight] Guild createdHeight
         */

        /**
         * Constructs a new Guild.
         * @memberof types
         * @classdesc Represents a Guild.
         * @implements IGuild
         * @constructor
         * @param {types.IGuild=} [properties] Properties to set
         */
        function Guild(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Guild id.
         * @member {number|Long} id
         * @memberof types.Guild
         * @instance
         */
        Guild.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Guild name.
         * @member {string} name
         * @memberof types.Guild
         * @instance
         */
        Guild.prototype.name = "";

        /**
         * Guild description.
         * @member {string} description
         * @memberof types.Guild
         * @instance
         */
        Guild.prototype.description = "";

        /**
         * Guild creatorAddress.
         * @member {Uint8Array} creatorAddress
         * @memberof types.Guild
         * @instance
         */
        Guild.prototype.creatorAddress = $util.newBuffer([]);

        /**
         * Guild minTrust.
         * @member {number|Long} minTrust
         * @memberof types.Guild
         * @instance
         */
        Guild.prototype.minTrust = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Guild memberCount.
         * @member {number|Long} memberCount
         * @memberof types.Guild
         * @instance
         */
        Guild.prototype.memberCount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Guild createdHeight.
         * @member {number|Long} createdHeight
         * @memberof types.Guild
         * @instance
         */
        Guild.prototype.createdHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Guild instance using the specified properties.
         * @function create
         * @memberof types.Guild
         * @static
         * @param {types.IGuild=} [properties] Properties to set
         * @returns {types.Guild} Guild instance
         */
        Guild.create = function create(properties) {
            return new Guild(properties);
        };

        /**
         * Encodes the specified Guild message. Does not implicitly {@link types.Guild.verify|verify} messages.
         * @function encode
         * @memberof types.Guild
         * @static
         * @param {types.IGuild} message Guild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Guild.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            if (message.creatorAddress != null && Object.hasOwnProperty.call(message, "creatorAddress"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.creatorAddress);
            if (message.minTrust != null && Object.hasOwnProperty.call(message, "minTrust"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.minTrust);
            if (message.memberCount != null && Object.hasOwnProperty.call(message, "memberCount"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.memberCount);
            if (message.createdHeight != null && Object.hasOwnProperty.call(message, "createdHeight"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.createdHeight);
            return writer;
        };

        /**
         * Encodes the specified Guild message, length delimited. Does not implicitly {@link types.Guild.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Guild
         * @static
         * @param {types.IGuild} message Guild message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Guild.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Guild message from the specified reader or buffer.
         * @function decode
         * @memberof types.Guild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Guild} Guild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Guild.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Guild();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint64();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.description = reader.string();
                        break;
                    }
                case 4: {
                        message.creatorAddress = reader.bytes();
                        break;
                    }
                case 5: {
                        message.minTrust = reader.uint64();
                        break;
                    }
                case 6: {
                        message.memberCount = reader.uint64();
                        break;
                    }
                case 7: {
                        message.createdHeight = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Guild message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Guild
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Guild} Guild
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Guild.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Guild message.
         * @function verify
         * @memberof types.Guild
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Guild.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.creatorAddress != null && message.hasOwnProperty("creatorAddress"))
                if (!(message.creatorAddress && typeof message.creatorAddress.length === "number" || $util.isString(message.creatorAddress)))
                    return "creatorAddress: buffer expected";
            if (message.minTrust != null && message.hasOwnProperty("minTrust"))
                if (!$util.isInteger(message.minTrust) && !(message.minTrust && $util.isInteger(message.minTrust.low) && $util.isInteger(message.minTrust.high)))
                    return "minTrust: integer|Long expected";
            if (message.memberCount != null && message.hasOwnProperty("memberCount"))
                if (!$util.isInteger(message.memberCount) && !(message.memberCount && $util.isInteger(message.memberCount.low) && $util.isInteger(message.memberCount.high)))
                    return "memberCount: integer|Long expected";
            if (message.createdHeight != null && message.hasOwnProperty("createdHeight"))
                if (!$util.isInteger(message.createdHeight) && !(message.createdHeight && $util.isInteger(message.createdHeight.low) && $util.isInteger(message.createdHeight.high)))
                    return "createdHeight: integer|Long expected";
            return null;
        };

        /**
         * Creates a Guild message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Guild
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Guild} Guild
         */
        Guild.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Guild)
                return object;
            var message = new $root.types.Guild();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            if (object.description != null)
                message.description = String(object.description);
            if (object.creatorAddress != null)
                if (typeof object.creatorAddress === "string")
                    $util.base64.decode(object.creatorAddress, message.creatorAddress = $util.newBuffer($util.base64.length(object.creatorAddress)), 0);
                else if (object.creatorAddress.length >= 0)
                    message.creatorAddress = object.creatorAddress;
            if (object.minTrust != null)
                if ($util.Long)
                    (message.minTrust = $util.Long.fromValue(object.minTrust)).unsigned = true;
                else if (typeof object.minTrust === "string")
                    message.minTrust = parseInt(object.minTrust, 10);
                else if (typeof object.minTrust === "number")
                    message.minTrust = object.minTrust;
                else if (typeof object.minTrust === "object")
                    message.minTrust = new $util.LongBits(object.minTrust.low >>> 0, object.minTrust.high >>> 0).toNumber(true);
            if (object.memberCount != null)
                if ($util.Long)
                    (message.memberCount = $util.Long.fromValue(object.memberCount)).unsigned = true;
                else if (typeof object.memberCount === "string")
                    message.memberCount = parseInt(object.memberCount, 10);
                else if (typeof object.memberCount === "number")
                    message.memberCount = object.memberCount;
                else if (typeof object.memberCount === "object")
                    message.memberCount = new $util.LongBits(object.memberCount.low >>> 0, object.memberCount.high >>> 0).toNumber(true);
            if (object.createdHeight != null)
                if ($util.Long)
                    (message.createdHeight = $util.Long.fromValue(object.createdHeight)).unsigned = true;
                else if (typeof object.createdHeight === "string")
                    message.createdHeight = parseInt(object.createdHeight, 10);
                else if (typeof object.createdHeight === "number")
                    message.createdHeight = object.createdHeight;
                else if (typeof object.createdHeight === "object")
                    message.createdHeight = new $util.LongBits(object.createdHeight.low >>> 0, object.createdHeight.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Guild message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Guild
         * @static
         * @param {types.Guild} message Guild
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Guild.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                object.name = "";
                object.description = "";
                if (options.bytes === String)
                    object.creatorAddress = "";
                else {
                    object.creatorAddress = [];
                    if (options.bytes !== Array)
                        object.creatorAddress = $util.newBuffer(object.creatorAddress);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.minTrust = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.minTrust = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.memberCount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.memberCount = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.createdHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createdHeight = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.creatorAddress != null && message.hasOwnProperty("creatorAddress"))
                object.creatorAddress = options.bytes === String ? $util.base64.encode(message.creatorAddress, 0, message.creatorAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.creatorAddress) : message.creatorAddress;
            if (message.minTrust != null && message.hasOwnProperty("minTrust"))
                if (typeof message.minTrust === "number")
                    object.minTrust = options.longs === String ? String(message.minTrust) : message.minTrust;
                else
                    object.minTrust = options.longs === String ? $util.Long.prototype.toString.call(message.minTrust) : options.longs === Number ? new $util.LongBits(message.minTrust.low >>> 0, message.minTrust.high >>> 0).toNumber(true) : message.minTrust;
            if (message.memberCount != null && message.hasOwnProperty("memberCount"))
                if (typeof message.memberCount === "number")
                    object.memberCount = options.longs === String ? String(message.memberCount) : message.memberCount;
                else
                    object.memberCount = options.longs === String ? $util.Long.prototype.toString.call(message.memberCount) : options.longs === Number ? new $util.LongBits(message.memberCount.low >>> 0, message.memberCount.high >>> 0).toNumber(true) : message.memberCount;
            if (message.createdHeight != null && message.hasOwnProperty("createdHeight"))
                if (typeof message.createdHeight === "number")
                    object.createdHeight = options.longs === String ? String(message.createdHeight) : message.createdHeight;
                else
                    object.createdHeight = options.longs === String ? $util.Long.prototype.toString.call(message.createdHeight) : options.longs === Number ? new $util.LongBits(message.createdHeight.low >>> 0, message.createdHeight.high >>> 0).toNumber(true) : message.createdHeight;
            return object;
        };

        /**
         * Converts this Guild to JSON.
         * @function toJSON
         * @memberof types.Guild
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Guild.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Guild
         * @function getTypeUrl
         * @memberof types.Guild
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Guild.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Guild";
        };

        return Guild;
    })();

    types.GuildMember = (function() {

        /**
         * Properties of a GuildMember.
         * @memberof types
         * @interface IGuildMember
         * @property {number|Long|null} [guildId] GuildMember guildId
         * @property {Uint8Array|null} [memberAddress] GuildMember memberAddress
         * @property {number|Long|null} [joinedHeight] GuildMember joinedHeight
         */

        /**
         * Constructs a new GuildMember.
         * @memberof types
         * @classdesc Represents a GuildMember.
         * @implements IGuildMember
         * @constructor
         * @param {types.IGuildMember=} [properties] Properties to set
         */
        function GuildMember(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GuildMember guildId.
         * @member {number|Long} guildId
         * @memberof types.GuildMember
         * @instance
         */
        GuildMember.prototype.guildId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * GuildMember memberAddress.
         * @member {Uint8Array} memberAddress
         * @memberof types.GuildMember
         * @instance
         */
        GuildMember.prototype.memberAddress = $util.newBuffer([]);

        /**
         * GuildMember joinedHeight.
         * @member {number|Long} joinedHeight
         * @memberof types.GuildMember
         * @instance
         */
        GuildMember.prototype.joinedHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new GuildMember instance using the specified properties.
         * @function create
         * @memberof types.GuildMember
         * @static
         * @param {types.IGuildMember=} [properties] Properties to set
         * @returns {types.GuildMember} GuildMember instance
         */
        GuildMember.create = function create(properties) {
            return new GuildMember(properties);
        };

        /**
         * Encodes the specified GuildMember message. Does not implicitly {@link types.GuildMember.verify|verify} messages.
         * @function encode
         * @memberof types.GuildMember
         * @static
         * @param {types.IGuildMember} message GuildMember message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GuildMember.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.guildId != null && Object.hasOwnProperty.call(message, "guildId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.guildId);
            if (message.memberAddress != null && Object.hasOwnProperty.call(message, "memberAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.memberAddress);
            if (message.joinedHeight != null && Object.hasOwnProperty.call(message, "joinedHeight"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.joinedHeight);
            return writer;
        };

        /**
         * Encodes the specified GuildMember message, length delimited. Does not implicitly {@link types.GuildMember.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.GuildMember
         * @static
         * @param {types.IGuildMember} message GuildMember message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GuildMember.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GuildMember message from the specified reader or buffer.
         * @function decode
         * @memberof types.GuildMember
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.GuildMember} GuildMember
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GuildMember.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.GuildMember();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.guildId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.memberAddress = reader.bytes();
                        break;
                    }
                case 3: {
                        message.joinedHeight = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GuildMember message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.GuildMember
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.GuildMember} GuildMember
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GuildMember.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GuildMember message.
         * @function verify
         * @memberof types.GuildMember
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GuildMember.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.guildId != null && message.hasOwnProperty("guildId"))
                if (!$util.isInteger(message.guildId) && !(message.guildId && $util.isInteger(message.guildId.low) && $util.isInteger(message.guildId.high)))
                    return "guildId: integer|Long expected";
            if (message.memberAddress != null && message.hasOwnProperty("memberAddress"))
                if (!(message.memberAddress && typeof message.memberAddress.length === "number" || $util.isString(message.memberAddress)))
                    return "memberAddress: buffer expected";
            if (message.joinedHeight != null && message.hasOwnProperty("joinedHeight"))
                if (!$util.isInteger(message.joinedHeight) && !(message.joinedHeight && $util.isInteger(message.joinedHeight.low) && $util.isInteger(message.joinedHeight.high)))
                    return "joinedHeight: integer|Long expected";
            return null;
        };

        /**
         * Creates a GuildMember message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.GuildMember
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.GuildMember} GuildMember
         */
        GuildMember.fromObject = function fromObject(object) {
            if (object instanceof $root.types.GuildMember)
                return object;
            var message = new $root.types.GuildMember();
            if (object.guildId != null)
                if ($util.Long)
                    (message.guildId = $util.Long.fromValue(object.guildId)).unsigned = true;
                else if (typeof object.guildId === "string")
                    message.guildId = parseInt(object.guildId, 10);
                else if (typeof object.guildId === "number")
                    message.guildId = object.guildId;
                else if (typeof object.guildId === "object")
                    message.guildId = new $util.LongBits(object.guildId.low >>> 0, object.guildId.high >>> 0).toNumber(true);
            if (object.memberAddress != null)
                if (typeof object.memberAddress === "string")
                    $util.base64.decode(object.memberAddress, message.memberAddress = $util.newBuffer($util.base64.length(object.memberAddress)), 0);
                else if (object.memberAddress.length >= 0)
                    message.memberAddress = object.memberAddress;
            if (object.joinedHeight != null)
                if ($util.Long)
                    (message.joinedHeight = $util.Long.fromValue(object.joinedHeight)).unsigned = true;
                else if (typeof object.joinedHeight === "string")
                    message.joinedHeight = parseInt(object.joinedHeight, 10);
                else if (typeof object.joinedHeight === "number")
                    message.joinedHeight = object.joinedHeight;
                else if (typeof object.joinedHeight === "object")
                    message.joinedHeight = new $util.LongBits(object.joinedHeight.low >>> 0, object.joinedHeight.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a GuildMember message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.GuildMember
         * @static
         * @param {types.GuildMember} message GuildMember
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GuildMember.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.guildId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.guildId = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.memberAddress = "";
                else {
                    object.memberAddress = [];
                    if (options.bytes !== Array)
                        object.memberAddress = $util.newBuffer(object.memberAddress);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.joinedHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.joinedHeight = options.longs === String ? "0" : 0;
            }
            if (message.guildId != null && message.hasOwnProperty("guildId"))
                if (typeof message.guildId === "number")
                    object.guildId = options.longs === String ? String(message.guildId) : message.guildId;
                else
                    object.guildId = options.longs === String ? $util.Long.prototype.toString.call(message.guildId) : options.longs === Number ? new $util.LongBits(message.guildId.low >>> 0, message.guildId.high >>> 0).toNumber(true) : message.guildId;
            if (message.memberAddress != null && message.hasOwnProperty("memberAddress"))
                object.memberAddress = options.bytes === String ? $util.base64.encode(message.memberAddress, 0, message.memberAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.memberAddress) : message.memberAddress;
            if (message.joinedHeight != null && message.hasOwnProperty("joinedHeight"))
                if (typeof message.joinedHeight === "number")
                    object.joinedHeight = options.longs === String ? String(message.joinedHeight) : message.joinedHeight;
                else
                    object.joinedHeight = options.longs === String ? $util.Long.prototype.toString.call(message.joinedHeight) : options.longs === Number ? new $util.LongBits(message.joinedHeight.low >>> 0, message.joinedHeight.high >>> 0).toNumber(true) : message.joinedHeight;
            return object;
        };

        /**
         * Converts this GuildMember to JSON.
         * @function toJSON
         * @memberof types.GuildMember
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GuildMember.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GuildMember
         * @function getTypeUrl
         * @memberof types.GuildMember
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GuildMember.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.GuildMember";
        };

        return GuildMember;
    })();

    types.Quest = (function() {

        /**
         * Properties of a Quest.
         * @memberof types
         * @interface IQuest
         * @property {number|Long|null} [id] Quest id
         * @property {number|Long|null} [guildId] Quest guildId
         * @property {Uint8Array|null} [authorAddress] Quest authorAddress
         * @property {string|null} [title] Quest title
         * @property {string|null} [description] Quest description
         * @property {number|Long|null} [reward] Quest reward
         * @property {string|null} [status] Quest status
         * @property {number|Long|null} [createdHeight] Quest createdHeight
         */

        /**
         * Constructs a new Quest.
         * @memberof types
         * @classdesc Represents a Quest.
         * @implements IQuest
         * @constructor
         * @param {types.IQuest=} [properties] Properties to set
         */
        function Quest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Quest id.
         * @member {number|Long} id
         * @memberof types.Quest
         * @instance
         */
        Quest.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Quest guildId.
         * @member {number|Long} guildId
         * @memberof types.Quest
         * @instance
         */
        Quest.prototype.guildId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Quest authorAddress.
         * @member {Uint8Array} authorAddress
         * @memberof types.Quest
         * @instance
         */
        Quest.prototype.authorAddress = $util.newBuffer([]);

        /**
         * Quest title.
         * @member {string} title
         * @memberof types.Quest
         * @instance
         */
        Quest.prototype.title = "";

        /**
         * Quest description.
         * @member {string} description
         * @memberof types.Quest
         * @instance
         */
        Quest.prototype.description = "";

        /**
         * Quest reward.
         * @member {number|Long} reward
         * @memberof types.Quest
         * @instance
         */
        Quest.prototype.reward = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Quest status.
         * @member {string} status
         * @memberof types.Quest
         * @instance
         */
        Quest.prototype.status = "";

        /**
         * Quest createdHeight.
         * @member {number|Long} createdHeight
         * @memberof types.Quest
         * @instance
         */
        Quest.prototype.createdHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Quest instance using the specified properties.
         * @function create
         * @memberof types.Quest
         * @static
         * @param {types.IQuest=} [properties] Properties to set
         * @returns {types.Quest} Quest instance
         */
        Quest.create = function create(properties) {
            return new Quest(properties);
        };

        /**
         * Encodes the specified Quest message. Does not implicitly {@link types.Quest.verify|verify} messages.
         * @function encode
         * @memberof types.Quest
         * @static
         * @param {types.IQuest} message Quest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Quest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.guildId != null && Object.hasOwnProperty.call(message, "guildId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.guildId);
            if (message.authorAddress != null && Object.hasOwnProperty.call(message, "authorAddress"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.authorAddress);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.title);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.description);
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.reward);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.status);
            if (message.createdHeight != null && Object.hasOwnProperty.call(message, "createdHeight"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.createdHeight);
            return writer;
        };

        /**
         * Encodes the specified Quest message, length delimited. Does not implicitly {@link types.Quest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Quest
         * @static
         * @param {types.IQuest} message Quest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Quest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Quest message from the specified reader or buffer.
         * @function decode
         * @memberof types.Quest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Quest} Quest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Quest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Quest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint64();
                        break;
                    }
                case 2: {
                        message.guildId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.authorAddress = reader.bytes();
                        break;
                    }
                case 4: {
                        message.title = reader.string();
                        break;
                    }
                case 5: {
                        message.description = reader.string();
                        break;
                    }
                case 6: {
                        message.reward = reader.uint64();
                        break;
                    }
                case 7: {
                        message.status = reader.string();
                        break;
                    }
                case 8: {
                        message.createdHeight = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Quest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Quest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Quest} Quest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Quest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Quest message.
         * @function verify
         * @memberof types.Quest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Quest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.guildId != null && message.hasOwnProperty("guildId"))
                if (!$util.isInteger(message.guildId) && !(message.guildId && $util.isInteger(message.guildId.low) && $util.isInteger(message.guildId.high)))
                    return "guildId: integer|Long expected";
            if (message.authorAddress != null && message.hasOwnProperty("authorAddress"))
                if (!(message.authorAddress && typeof message.authorAddress.length === "number" || $util.isString(message.authorAddress)))
                    return "authorAddress: buffer expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.reward != null && message.hasOwnProperty("reward"))
                if (!$util.isInteger(message.reward) && !(message.reward && $util.isInteger(message.reward.low) && $util.isInteger(message.reward.high)))
                    return "reward: integer|Long expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isString(message.status))
                    return "status: string expected";
            if (message.createdHeight != null && message.hasOwnProperty("createdHeight"))
                if (!$util.isInteger(message.createdHeight) && !(message.createdHeight && $util.isInteger(message.createdHeight.low) && $util.isInteger(message.createdHeight.high)))
                    return "createdHeight: integer|Long expected";
            return null;
        };

        /**
         * Creates a Quest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Quest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Quest} Quest
         */
        Quest.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Quest)
                return object;
            var message = new $root.types.Quest();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.guildId != null)
                if ($util.Long)
                    (message.guildId = $util.Long.fromValue(object.guildId)).unsigned = true;
                else if (typeof object.guildId === "string")
                    message.guildId = parseInt(object.guildId, 10);
                else if (typeof object.guildId === "number")
                    message.guildId = object.guildId;
                else if (typeof object.guildId === "object")
                    message.guildId = new $util.LongBits(object.guildId.low >>> 0, object.guildId.high >>> 0).toNumber(true);
            if (object.authorAddress != null)
                if (typeof object.authorAddress === "string")
                    $util.base64.decode(object.authorAddress, message.authorAddress = $util.newBuffer($util.base64.length(object.authorAddress)), 0);
                else if (object.authorAddress.length >= 0)
                    message.authorAddress = object.authorAddress;
            if (object.title != null)
                message.title = String(object.title);
            if (object.description != null)
                message.description = String(object.description);
            if (object.reward != null)
                if ($util.Long)
                    (message.reward = $util.Long.fromValue(object.reward)).unsigned = true;
                else if (typeof object.reward === "string")
                    message.reward = parseInt(object.reward, 10);
                else if (typeof object.reward === "number")
                    message.reward = object.reward;
                else if (typeof object.reward === "object")
                    message.reward = new $util.LongBits(object.reward.low >>> 0, object.reward.high >>> 0).toNumber(true);
            if (object.status != null)
                message.status = String(object.status);
            if (object.createdHeight != null)
                if ($util.Long)
                    (message.createdHeight = $util.Long.fromValue(object.createdHeight)).unsigned = true;
                else if (typeof object.createdHeight === "string")
                    message.createdHeight = parseInt(object.createdHeight, 10);
                else if (typeof object.createdHeight === "number")
                    message.createdHeight = object.createdHeight;
                else if (typeof object.createdHeight === "object")
                    message.createdHeight = new $util.LongBits(object.createdHeight.low >>> 0, object.createdHeight.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Quest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Quest
         * @static
         * @param {types.Quest} message Quest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Quest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.guildId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.guildId = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.authorAddress = "";
                else {
                    object.authorAddress = [];
                    if (options.bytes !== Array)
                        object.authorAddress = $util.newBuffer(object.authorAddress);
                }
                object.title = "";
                object.description = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.reward = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.reward = options.longs === String ? "0" : 0;
                object.status = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.createdHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createdHeight = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.guildId != null && message.hasOwnProperty("guildId"))
                if (typeof message.guildId === "number")
                    object.guildId = options.longs === String ? String(message.guildId) : message.guildId;
                else
                    object.guildId = options.longs === String ? $util.Long.prototype.toString.call(message.guildId) : options.longs === Number ? new $util.LongBits(message.guildId.low >>> 0, message.guildId.high >>> 0).toNumber(true) : message.guildId;
            if (message.authorAddress != null && message.hasOwnProperty("authorAddress"))
                object.authorAddress = options.bytes === String ? $util.base64.encode(message.authorAddress, 0, message.authorAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.authorAddress) : message.authorAddress;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.reward != null && message.hasOwnProperty("reward"))
                if (typeof message.reward === "number")
                    object.reward = options.longs === String ? String(message.reward) : message.reward;
                else
                    object.reward = options.longs === String ? $util.Long.prototype.toString.call(message.reward) : options.longs === Number ? new $util.LongBits(message.reward.low >>> 0, message.reward.high >>> 0).toNumber(true) : message.reward;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            if (message.createdHeight != null && message.hasOwnProperty("createdHeight"))
                if (typeof message.createdHeight === "number")
                    object.createdHeight = options.longs === String ? String(message.createdHeight) : message.createdHeight;
                else
                    object.createdHeight = options.longs === String ? $util.Long.prototype.toString.call(message.createdHeight) : options.longs === Number ? new $util.LongBits(message.createdHeight.low >>> 0, message.createdHeight.high >>> 0).toNumber(true) : message.createdHeight;
            return object;
        };

        /**
         * Converts this Quest to JSON.
         * @function toJSON
         * @memberof types.Quest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Quest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Quest
         * @function getTypeUrl
         * @memberof types.Quest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Quest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Quest";
        };

        return Quest;
    })();

    types.Proof = (function() {

        /**
         * Properties of a Proof.
         * @memberof types
         * @interface IProof
         * @property {number|Long|null} [id] Proof id
         * @property {number|Long|null} [questId] Proof questId
         * @property {Uint8Array|null} [authorAddress] Proof authorAddress
         * @property {string|null} [proofUri] Proof proofUri
         * @property {boolean|null} [attested] Proof attested
         * @property {boolean|null} [approved] Proof approved
         * @property {number|Long|null} [submittedHeight] Proof submittedHeight
         */

        /**
         * Constructs a new Proof.
         * @memberof types
         * @classdesc Represents a Proof.
         * @implements IProof
         * @constructor
         * @param {types.IProof=} [properties] Properties to set
         */
        function Proof(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Proof id.
         * @member {number|Long} id
         * @memberof types.Proof
         * @instance
         */
        Proof.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Proof questId.
         * @member {number|Long} questId
         * @memberof types.Proof
         * @instance
         */
        Proof.prototype.questId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Proof authorAddress.
         * @member {Uint8Array} authorAddress
         * @memberof types.Proof
         * @instance
         */
        Proof.prototype.authorAddress = $util.newBuffer([]);

        /**
         * Proof proofUri.
         * @member {string} proofUri
         * @memberof types.Proof
         * @instance
         */
        Proof.prototype.proofUri = "";

        /**
         * Proof attested.
         * @member {boolean} attested
         * @memberof types.Proof
         * @instance
         */
        Proof.prototype.attested = false;

        /**
         * Proof approved.
         * @member {boolean} approved
         * @memberof types.Proof
         * @instance
         */
        Proof.prototype.approved = false;

        /**
         * Proof submittedHeight.
         * @member {number|Long} submittedHeight
         * @memberof types.Proof
         * @instance
         */
        Proof.prototype.submittedHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Proof instance using the specified properties.
         * @function create
         * @memberof types.Proof
         * @static
         * @param {types.IProof=} [properties] Properties to set
         * @returns {types.Proof} Proof instance
         */
        Proof.create = function create(properties) {
            return new Proof(properties);
        };

        /**
         * Encodes the specified Proof message. Does not implicitly {@link types.Proof.verify|verify} messages.
         * @function encode
         * @memberof types.Proof
         * @static
         * @param {types.IProof} message Proof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Proof.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.questId != null && Object.hasOwnProperty.call(message, "questId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.questId);
            if (message.authorAddress != null && Object.hasOwnProperty.call(message, "authorAddress"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.authorAddress);
            if (message.proofUri != null && Object.hasOwnProperty.call(message, "proofUri"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.proofUri);
            if (message.attested != null && Object.hasOwnProperty.call(message, "attested"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.attested);
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.approved);
            if (message.submittedHeight != null && Object.hasOwnProperty.call(message, "submittedHeight"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.submittedHeight);
            return writer;
        };

        /**
         * Encodes the specified Proof message, length delimited. Does not implicitly {@link types.Proof.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Proof
         * @static
         * @param {types.IProof} message Proof message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Proof.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Proof message from the specified reader or buffer.
         * @function decode
         * @memberof types.Proof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Proof} Proof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Proof.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Proof();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint64();
                        break;
                    }
                case 2: {
                        message.questId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.authorAddress = reader.bytes();
                        break;
                    }
                case 4: {
                        message.proofUri = reader.string();
                        break;
                    }
                case 5: {
                        message.attested = reader.bool();
                        break;
                    }
                case 6: {
                        message.approved = reader.bool();
                        break;
                    }
                case 7: {
                        message.submittedHeight = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Proof message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Proof
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Proof} Proof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Proof.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Proof message.
         * @function verify
         * @memberof types.Proof
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Proof.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.questId != null && message.hasOwnProperty("questId"))
                if (!$util.isInteger(message.questId) && !(message.questId && $util.isInteger(message.questId.low) && $util.isInteger(message.questId.high)))
                    return "questId: integer|Long expected";
            if (message.authorAddress != null && message.hasOwnProperty("authorAddress"))
                if (!(message.authorAddress && typeof message.authorAddress.length === "number" || $util.isString(message.authorAddress)))
                    return "authorAddress: buffer expected";
            if (message.proofUri != null && message.hasOwnProperty("proofUri"))
                if (!$util.isString(message.proofUri))
                    return "proofUri: string expected";
            if (message.attested != null && message.hasOwnProperty("attested"))
                if (typeof message.attested !== "boolean")
                    return "attested: boolean expected";
            if (message.approved != null && message.hasOwnProperty("approved"))
                if (typeof message.approved !== "boolean")
                    return "approved: boolean expected";
            if (message.submittedHeight != null && message.hasOwnProperty("submittedHeight"))
                if (!$util.isInteger(message.submittedHeight) && !(message.submittedHeight && $util.isInteger(message.submittedHeight.low) && $util.isInteger(message.submittedHeight.high)))
                    return "submittedHeight: integer|Long expected";
            return null;
        };

        /**
         * Creates a Proof message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Proof
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Proof} Proof
         */
        Proof.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Proof)
                return object;
            var message = new $root.types.Proof();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.questId != null)
                if ($util.Long)
                    (message.questId = $util.Long.fromValue(object.questId)).unsigned = true;
                else if (typeof object.questId === "string")
                    message.questId = parseInt(object.questId, 10);
                else if (typeof object.questId === "number")
                    message.questId = object.questId;
                else if (typeof object.questId === "object")
                    message.questId = new $util.LongBits(object.questId.low >>> 0, object.questId.high >>> 0).toNumber(true);
            if (object.authorAddress != null)
                if (typeof object.authorAddress === "string")
                    $util.base64.decode(object.authorAddress, message.authorAddress = $util.newBuffer($util.base64.length(object.authorAddress)), 0);
                else if (object.authorAddress.length >= 0)
                    message.authorAddress = object.authorAddress;
            if (object.proofUri != null)
                message.proofUri = String(object.proofUri);
            if (object.attested != null)
                message.attested = Boolean(object.attested);
            if (object.approved != null)
                message.approved = Boolean(object.approved);
            if (object.submittedHeight != null)
                if ($util.Long)
                    (message.submittedHeight = $util.Long.fromValue(object.submittedHeight)).unsigned = true;
                else if (typeof object.submittedHeight === "string")
                    message.submittedHeight = parseInt(object.submittedHeight, 10);
                else if (typeof object.submittedHeight === "number")
                    message.submittedHeight = object.submittedHeight;
                else if (typeof object.submittedHeight === "object")
                    message.submittedHeight = new $util.LongBits(object.submittedHeight.low >>> 0, object.submittedHeight.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Proof message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Proof
         * @static
         * @param {types.Proof} message Proof
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Proof.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.questId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.questId = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.authorAddress = "";
                else {
                    object.authorAddress = [];
                    if (options.bytes !== Array)
                        object.authorAddress = $util.newBuffer(object.authorAddress);
                }
                object.proofUri = "";
                object.attested = false;
                object.approved = false;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.submittedHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.submittedHeight = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.questId != null && message.hasOwnProperty("questId"))
                if (typeof message.questId === "number")
                    object.questId = options.longs === String ? String(message.questId) : message.questId;
                else
                    object.questId = options.longs === String ? $util.Long.prototype.toString.call(message.questId) : options.longs === Number ? new $util.LongBits(message.questId.low >>> 0, message.questId.high >>> 0).toNumber(true) : message.questId;
            if (message.authorAddress != null && message.hasOwnProperty("authorAddress"))
                object.authorAddress = options.bytes === String ? $util.base64.encode(message.authorAddress, 0, message.authorAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.authorAddress) : message.authorAddress;
            if (message.proofUri != null && message.hasOwnProperty("proofUri"))
                object.proofUri = message.proofUri;
            if (message.attested != null && message.hasOwnProperty("attested"))
                object.attested = message.attested;
            if (message.approved != null && message.hasOwnProperty("approved"))
                object.approved = message.approved;
            if (message.submittedHeight != null && message.hasOwnProperty("submittedHeight"))
                if (typeof message.submittedHeight === "number")
                    object.submittedHeight = options.longs === String ? String(message.submittedHeight) : message.submittedHeight;
                else
                    object.submittedHeight = options.longs === String ? $util.Long.prototype.toString.call(message.submittedHeight) : options.longs === Number ? new $util.LongBits(message.submittedHeight.low >>> 0, message.submittedHeight.high >>> 0).toNumber(true) : message.submittedHeight;
            return object;
        };

        /**
         * Converts this Proof to JSON.
         * @function toJSON
         * @memberof types.Proof
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Proof.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Proof
         * @function getTypeUrl
         * @memberof types.Proof
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Proof.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Proof";
        };

        return Proof;
    })();

    types.Proposal = (function() {

        /**
         * Properties of a Proposal.
         * @memberof types
         * @interface IProposal
         * @property {string|null} [id] Proposal id
         * @property {string|null} [title] Proposal title
         * @property {Uint8Array|null} [creatorAddress] Proposal creatorAddress
         * @property {number|Long|null} [yesWeight] Proposal yesWeight
         * @property {number|Long|null} [noWeight] Proposal noWeight
         * @property {number|Long|null} [voteCount] Proposal voteCount
         * @property {number|Long|null} [createdHeight] Proposal createdHeight
         */

        /**
         * Constructs a new Proposal.
         * @memberof types
         * @classdesc Represents a Proposal.
         * @implements IProposal
         * @constructor
         * @param {types.IProposal=} [properties] Properties to set
         */
        function Proposal(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Proposal id.
         * @member {string} id
         * @memberof types.Proposal
         * @instance
         */
        Proposal.prototype.id = "";

        /**
         * Proposal title.
         * @member {string} title
         * @memberof types.Proposal
         * @instance
         */
        Proposal.prototype.title = "";

        /**
         * Proposal creatorAddress.
         * @member {Uint8Array} creatorAddress
         * @memberof types.Proposal
         * @instance
         */
        Proposal.prototype.creatorAddress = $util.newBuffer([]);

        /**
         * Proposal yesWeight.
         * @member {number|Long} yesWeight
         * @memberof types.Proposal
         * @instance
         */
        Proposal.prototype.yesWeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Proposal noWeight.
         * @member {number|Long} noWeight
         * @memberof types.Proposal
         * @instance
         */
        Proposal.prototype.noWeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Proposal voteCount.
         * @member {number|Long} voteCount
         * @memberof types.Proposal
         * @instance
         */
        Proposal.prototype.voteCount = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Proposal createdHeight.
         * @member {number|Long} createdHeight
         * @memberof types.Proposal
         * @instance
         */
        Proposal.prototype.createdHeight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Proposal instance using the specified properties.
         * @function create
         * @memberof types.Proposal
         * @static
         * @param {types.IProposal=} [properties] Properties to set
         * @returns {types.Proposal} Proposal instance
         */
        Proposal.create = function create(properties) {
            return new Proposal(properties);
        };

        /**
         * Encodes the specified Proposal message. Does not implicitly {@link types.Proposal.verify|verify} messages.
         * @function encode
         * @memberof types.Proposal
         * @static
         * @param {types.IProposal} message Proposal message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Proposal.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
            if (message.creatorAddress != null && Object.hasOwnProperty.call(message, "creatorAddress"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.creatorAddress);
            if (message.yesWeight != null && Object.hasOwnProperty.call(message, "yesWeight"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.yesWeight);
            if (message.noWeight != null && Object.hasOwnProperty.call(message, "noWeight"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.noWeight);
            if (message.voteCount != null && Object.hasOwnProperty.call(message, "voteCount"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.voteCount);
            if (message.createdHeight != null && Object.hasOwnProperty.call(message, "createdHeight"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.createdHeight);
            return writer;
        };

        /**
         * Encodes the specified Proposal message, length delimited. Does not implicitly {@link types.Proposal.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Proposal
         * @static
         * @param {types.IProposal} message Proposal message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Proposal.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Proposal message from the specified reader or buffer.
         * @function decode
         * @memberof types.Proposal
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Proposal} Proposal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Proposal.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Proposal();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.title = reader.string();
                        break;
                    }
                case 3: {
                        message.creatorAddress = reader.bytes();
                        break;
                    }
                case 4: {
                        message.yesWeight = reader.uint64();
                        break;
                    }
                case 5: {
                        message.noWeight = reader.uint64();
                        break;
                    }
                case 6: {
                        message.voteCount = reader.uint64();
                        break;
                    }
                case 7: {
                        message.createdHeight = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Proposal message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Proposal
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Proposal} Proposal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Proposal.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Proposal message.
         * @function verify
         * @memberof types.Proposal
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Proposal.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.creatorAddress != null && message.hasOwnProperty("creatorAddress"))
                if (!(message.creatorAddress && typeof message.creatorAddress.length === "number" || $util.isString(message.creatorAddress)))
                    return "creatorAddress: buffer expected";
            if (message.yesWeight != null && message.hasOwnProperty("yesWeight"))
                if (!$util.isInteger(message.yesWeight) && !(message.yesWeight && $util.isInteger(message.yesWeight.low) && $util.isInteger(message.yesWeight.high)))
                    return "yesWeight: integer|Long expected";
            if (message.noWeight != null && message.hasOwnProperty("noWeight"))
                if (!$util.isInteger(message.noWeight) && !(message.noWeight && $util.isInteger(message.noWeight.low) && $util.isInteger(message.noWeight.high)))
                    return "noWeight: integer|Long expected";
            if (message.voteCount != null && message.hasOwnProperty("voteCount"))
                if (!$util.isInteger(message.voteCount) && !(message.voteCount && $util.isInteger(message.voteCount.low) && $util.isInteger(message.voteCount.high)))
                    return "voteCount: integer|Long expected";
            if (message.createdHeight != null && message.hasOwnProperty("createdHeight"))
                if (!$util.isInteger(message.createdHeight) && !(message.createdHeight && $util.isInteger(message.createdHeight.low) && $util.isInteger(message.createdHeight.high)))
                    return "createdHeight: integer|Long expected";
            return null;
        };

        /**
         * Creates a Proposal message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Proposal
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Proposal} Proposal
         */
        Proposal.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Proposal)
                return object;
            var message = new $root.types.Proposal();
            if (object.id != null)
                message.id = String(object.id);
            if (object.title != null)
                message.title = String(object.title);
            if (object.creatorAddress != null)
                if (typeof object.creatorAddress === "string")
                    $util.base64.decode(object.creatorAddress, message.creatorAddress = $util.newBuffer($util.base64.length(object.creatorAddress)), 0);
                else if (object.creatorAddress.length >= 0)
                    message.creatorAddress = object.creatorAddress;
            if (object.yesWeight != null)
                if ($util.Long)
                    (message.yesWeight = $util.Long.fromValue(object.yesWeight)).unsigned = true;
                else if (typeof object.yesWeight === "string")
                    message.yesWeight = parseInt(object.yesWeight, 10);
                else if (typeof object.yesWeight === "number")
                    message.yesWeight = object.yesWeight;
                else if (typeof object.yesWeight === "object")
                    message.yesWeight = new $util.LongBits(object.yesWeight.low >>> 0, object.yesWeight.high >>> 0).toNumber(true);
            if (object.noWeight != null)
                if ($util.Long)
                    (message.noWeight = $util.Long.fromValue(object.noWeight)).unsigned = true;
                else if (typeof object.noWeight === "string")
                    message.noWeight = parseInt(object.noWeight, 10);
                else if (typeof object.noWeight === "number")
                    message.noWeight = object.noWeight;
                else if (typeof object.noWeight === "object")
                    message.noWeight = new $util.LongBits(object.noWeight.low >>> 0, object.noWeight.high >>> 0).toNumber(true);
            if (object.voteCount != null)
                if ($util.Long)
                    (message.voteCount = $util.Long.fromValue(object.voteCount)).unsigned = true;
                else if (typeof object.voteCount === "string")
                    message.voteCount = parseInt(object.voteCount, 10);
                else if (typeof object.voteCount === "number")
                    message.voteCount = object.voteCount;
                else if (typeof object.voteCount === "object")
                    message.voteCount = new $util.LongBits(object.voteCount.low >>> 0, object.voteCount.high >>> 0).toNumber(true);
            if (object.createdHeight != null)
                if ($util.Long)
                    (message.createdHeight = $util.Long.fromValue(object.createdHeight)).unsigned = true;
                else if (typeof object.createdHeight === "string")
                    message.createdHeight = parseInt(object.createdHeight, 10);
                else if (typeof object.createdHeight === "number")
                    message.createdHeight = object.createdHeight;
                else if (typeof object.createdHeight === "object")
                    message.createdHeight = new $util.LongBits(object.createdHeight.low >>> 0, object.createdHeight.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Proposal message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Proposal
         * @static
         * @param {types.Proposal} message Proposal
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Proposal.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.title = "";
                if (options.bytes === String)
                    object.creatorAddress = "";
                else {
                    object.creatorAddress = [];
                    if (options.bytes !== Array)
                        object.creatorAddress = $util.newBuffer(object.creatorAddress);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.yesWeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.yesWeight = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.noWeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.noWeight = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.voteCount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.voteCount = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.createdHeight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createdHeight = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.creatorAddress != null && message.hasOwnProperty("creatorAddress"))
                object.creatorAddress = options.bytes === String ? $util.base64.encode(message.creatorAddress, 0, message.creatorAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.creatorAddress) : message.creatorAddress;
            if (message.yesWeight != null && message.hasOwnProperty("yesWeight"))
                if (typeof message.yesWeight === "number")
                    object.yesWeight = options.longs === String ? String(message.yesWeight) : message.yesWeight;
                else
                    object.yesWeight = options.longs === String ? $util.Long.prototype.toString.call(message.yesWeight) : options.longs === Number ? new $util.LongBits(message.yesWeight.low >>> 0, message.yesWeight.high >>> 0).toNumber(true) : message.yesWeight;
            if (message.noWeight != null && message.hasOwnProperty("noWeight"))
                if (typeof message.noWeight === "number")
                    object.noWeight = options.longs === String ? String(message.noWeight) : message.noWeight;
                else
                    object.noWeight = options.longs === String ? $util.Long.prototype.toString.call(message.noWeight) : options.longs === Number ? new $util.LongBits(message.noWeight.low >>> 0, message.noWeight.high >>> 0).toNumber(true) : message.noWeight;
            if (message.voteCount != null && message.hasOwnProperty("voteCount"))
                if (typeof message.voteCount === "number")
                    object.voteCount = options.longs === String ? String(message.voteCount) : message.voteCount;
                else
                    object.voteCount = options.longs === String ? $util.Long.prototype.toString.call(message.voteCount) : options.longs === Number ? new $util.LongBits(message.voteCount.low >>> 0, message.voteCount.high >>> 0).toNumber(true) : message.voteCount;
            if (message.createdHeight != null && message.hasOwnProperty("createdHeight"))
                if (typeof message.createdHeight === "number")
                    object.createdHeight = options.longs === String ? String(message.createdHeight) : message.createdHeight;
                else
                    object.createdHeight = options.longs === String ? $util.Long.prototype.toString.call(message.createdHeight) : options.longs === Number ? new $util.LongBits(message.createdHeight.low >>> 0, message.createdHeight.high >>> 0).toNumber(true) : message.createdHeight;
            return object;
        };

        /**
         * Converts this Proposal to JSON.
         * @function toJSON
         * @memberof types.Proposal
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Proposal.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Proposal
         * @function getTypeUrl
         * @memberof types.Proposal
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Proposal.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Proposal";
        };

        return Proposal;
    })();

    types.Vote = (function() {

        /**
         * Properties of a Vote.
         * @memberof types
         * @interface IVote
         * @property {string|null} [proposalId] Vote proposalId
         * @property {Uint8Array|null} [voterAddress] Vote voterAddress
         * @property {boolean|null} [choice] Vote choice
         * @property {number|Long|null} [weight] Vote weight
         * @property {number|Long|null} [height] Vote height
         */

        /**
         * Constructs a new Vote.
         * @memberof types
         * @classdesc Represents a Vote.
         * @implements IVote
         * @constructor
         * @param {types.IVote=} [properties] Properties to set
         */
        function Vote(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vote proposalId.
         * @member {string} proposalId
         * @memberof types.Vote
         * @instance
         */
        Vote.prototype.proposalId = "";

        /**
         * Vote voterAddress.
         * @member {Uint8Array} voterAddress
         * @memberof types.Vote
         * @instance
         */
        Vote.prototype.voterAddress = $util.newBuffer([]);

        /**
         * Vote choice.
         * @member {boolean} choice
         * @memberof types.Vote
         * @instance
         */
        Vote.prototype.choice = false;

        /**
         * Vote weight.
         * @member {number|Long} weight
         * @memberof types.Vote
         * @instance
         */
        Vote.prototype.weight = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Vote height.
         * @member {number|Long} height
         * @memberof types.Vote
         * @instance
         */
        Vote.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Vote instance using the specified properties.
         * @function create
         * @memberof types.Vote
         * @static
         * @param {types.IVote=} [properties] Properties to set
         * @returns {types.Vote} Vote instance
         */
        Vote.create = function create(properties) {
            return new Vote(properties);
        };

        /**
         * Encodes the specified Vote message. Does not implicitly {@link types.Vote.verify|verify} messages.
         * @function encode
         * @memberof types.Vote
         * @static
         * @param {types.IVote} message Vote message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vote.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.proposalId != null && Object.hasOwnProperty.call(message, "proposalId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.proposalId);
            if (message.voterAddress != null && Object.hasOwnProperty.call(message, "voterAddress"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.voterAddress);
            if (message.choice != null && Object.hasOwnProperty.call(message, "choice"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.choice);
            if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.weight);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.height);
            return writer;
        };

        /**
         * Encodes the specified Vote message, length delimited. Does not implicitly {@link types.Vote.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Vote
         * @static
         * @param {types.IVote} message Vote message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vote.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vote message from the specified reader or buffer.
         * @function decode
         * @memberof types.Vote
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Vote} Vote
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vote.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Vote();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.proposalId = reader.string();
                        break;
                    }
                case 2: {
                        message.voterAddress = reader.bytes();
                        break;
                    }
                case 3: {
                        message.choice = reader.bool();
                        break;
                    }
                case 4: {
                        message.weight = reader.uint64();
                        break;
                    }
                case 5: {
                        message.height = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Vote message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Vote
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Vote} Vote
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vote.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vote message.
         * @function verify
         * @memberof types.Vote
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vote.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.proposalId != null && message.hasOwnProperty("proposalId"))
                if (!$util.isString(message.proposalId))
                    return "proposalId: string expected";
            if (message.voterAddress != null && message.hasOwnProperty("voterAddress"))
                if (!(message.voterAddress && typeof message.voterAddress.length === "number" || $util.isString(message.voterAddress)))
                    return "voterAddress: buffer expected";
            if (message.choice != null && message.hasOwnProperty("choice"))
                if (typeof message.choice !== "boolean")
                    return "choice: boolean expected";
            if (message.weight != null && message.hasOwnProperty("weight"))
                if (!$util.isInteger(message.weight) && !(message.weight && $util.isInteger(message.weight.low) && $util.isInteger(message.weight.high)))
                    return "weight: integer|Long expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                    return "height: integer|Long expected";
            return null;
        };

        /**
         * Creates a Vote message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Vote
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Vote} Vote
         */
        Vote.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Vote)
                return object;
            var message = new $root.types.Vote();
            if (object.proposalId != null)
                message.proposalId = String(object.proposalId);
            if (object.voterAddress != null)
                if (typeof object.voterAddress === "string")
                    $util.base64.decode(object.voterAddress, message.voterAddress = $util.newBuffer($util.base64.length(object.voterAddress)), 0);
                else if (object.voterAddress.length >= 0)
                    message.voterAddress = object.voterAddress;
            if (object.choice != null)
                message.choice = Boolean(object.choice);
            if (object.weight != null)
                if ($util.Long)
                    (message.weight = $util.Long.fromValue(object.weight)).unsigned = true;
                else if (typeof object.weight === "string")
                    message.weight = parseInt(object.weight, 10);
                else if (typeof object.weight === "number")
                    message.weight = object.weight;
                else if (typeof object.weight === "object")
                    message.weight = new $util.LongBits(object.weight.low >>> 0, object.weight.high >>> 0).toNumber(true);
            if (object.height != null)
                if ($util.Long)
                    (message.height = $util.Long.fromValue(object.height)).unsigned = true;
                else if (typeof object.height === "string")
                    message.height = parseInt(object.height, 10);
                else if (typeof object.height === "number")
                    message.height = object.height;
                else if (typeof object.height === "object")
                    message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Vote message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Vote
         * @static
         * @param {types.Vote} message Vote
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vote.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.proposalId = "";
                if (options.bytes === String)
                    object.voterAddress = "";
                else {
                    object.voterAddress = [];
                    if (options.bytes !== Array)
                        object.voterAddress = $util.newBuffer(object.voterAddress);
                }
                object.choice = false;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.weight = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.weight = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.height = options.longs === String ? "0" : 0;
            }
            if (message.proposalId != null && message.hasOwnProperty("proposalId"))
                object.proposalId = message.proposalId;
            if (message.voterAddress != null && message.hasOwnProperty("voterAddress"))
                object.voterAddress = options.bytes === String ? $util.base64.encode(message.voterAddress, 0, message.voterAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.voterAddress) : message.voterAddress;
            if (message.choice != null && message.hasOwnProperty("choice"))
                object.choice = message.choice;
            if (message.weight != null && message.hasOwnProperty("weight"))
                if (typeof message.weight === "number")
                    object.weight = options.longs === String ? String(message.weight) : message.weight;
                else
                    object.weight = options.longs === String ? $util.Long.prototype.toString.call(message.weight) : options.longs === Number ? new $util.LongBits(message.weight.low >>> 0, message.weight.high >>> 0).toNumber(true) : message.weight;
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height === "number")
                    object.height = options.longs === String ? String(message.height) : message.height;
                else
                    object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
            return object;
        };

        /**
         * Converts this Vote to JSON.
         * @function toJSON
         * @memberof types.Vote
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vote.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Vote
         * @function getTypeUrl
         * @memberof types.Vote
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Vote.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Vote";
        };

        return Vote;
    })();

    types.Counter = (function() {

        /**
         * Properties of a Counter.
         * @memberof types
         * @interface ICounter
         * @property {number|Long|null} [count] Counter count
         */

        /**
         * Constructs a new Counter.
         * @memberof types
         * @classdesc Represents a Counter.
         * @implements ICounter
         * @constructor
         * @param {types.ICounter=} [properties] Properties to set
         */
        function Counter(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Counter count.
         * @member {number|Long} count
         * @memberof types.Counter
         * @instance
         */
        Counter.prototype.count = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Counter instance using the specified properties.
         * @function create
         * @memberof types.Counter
         * @static
         * @param {types.ICounter=} [properties] Properties to set
         * @returns {types.Counter} Counter instance
         */
        Counter.create = function create(properties) {
            return new Counter(properties);
        };

        /**
         * Encodes the specified Counter message. Does not implicitly {@link types.Counter.verify|verify} messages.
         * @function encode
         * @memberof types.Counter
         * @static
         * @param {types.ICounter} message Counter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Counter.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.count);
            return writer;
        };

        /**
         * Encodes the specified Counter message, length delimited. Does not implicitly {@link types.Counter.verify|verify} messages.
         * @function encodeDelimited
         * @memberof types.Counter
         * @static
         * @param {types.ICounter} message Counter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Counter.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Counter message from the specified reader or buffer.
         * @function decode
         * @memberof types.Counter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {types.Counter} Counter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Counter.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.types.Counter();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.count = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Counter message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof types.Counter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {types.Counter} Counter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Counter.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Counter message.
         * @function verify
         * @memberof types.Counter
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Counter.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
            return null;
        };

        /**
         * Creates a Counter message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof types.Counter
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {types.Counter} Counter
         */
        Counter.fromObject = function fromObject(object) {
            if (object instanceof $root.types.Counter)
                return object;
            var message = new $root.types.Counter();
            if (object.count != null)
                if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = true;
                else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                else if (typeof object.count === "number")
                    message.count = object.count;
                else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Counter message. Also converts values to other types if specified.
         * @function toObject
         * @memberof types.Counter
         * @static
         * @param {types.Counter} message Counter
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Counter.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.count = options.longs === String ? "0" : 0;
            if (message.count != null && message.hasOwnProperty("count"))
                if (typeof message.count === "number")
                    object.count = options.longs === String ? String(message.count) : message.count;
                else
                    object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber(true) : message.count;
            return object;
        };

        /**
         * Converts this Counter to JSON.
         * @function toJSON
         * @memberof types.Counter
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Counter.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Counter
         * @function getTypeUrl
         * @memberof types.Counter
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Counter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/types.Counter";
        };

        return Counter;
    })();

    return types;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.type_url = reader.string();
                            break;
                        }
                    case 2: {
                            message.value = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                var message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length >= 0)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Any
             * @function getTypeUrl
             * @memberof google.protobuf.Any
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Any.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Any";
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
