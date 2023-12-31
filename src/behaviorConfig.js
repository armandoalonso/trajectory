// WARNING: DO NOT EDIT THIS FILE, IT IS AUTOGENERATED
module.exports = {
  addonType: "behavior",
  id: "piranha305_trajectory",
  name: "Trajectory",
  version: "1.1.0.0",
  category:
    // "attributes",
     "movements",
    // "other",
    // "general",
  author: "piranha305",
  website: "https://www.construct.net",
  documentation: "https://www.construct.net",
  description: "A Trajectory behavior for Construct 3, Simulate 2D physics trajectory and projectile motion. simulates the motion of an object that is thrown, launched, or otherwise projected",
  // icon: "icon.svg", // defaults to "icon.svg" if omitted
  addonUrl: "https://www.construct.net/en/make-games/addons/1088/trajectory", // displayed in auto-generated docs
  // githubUrl: "https://github.com/skymen/XXXX", // displays latest release version in auto-generated docs
  fileDependencies: [
    {
      filename: "objectPool.js",
      type: "inline-script",
    }
    /*
    {
      filename: "filename.js", // no need to include "c3runtime/" prefix
      type:
        "copy-to-output"
        "inline-script"
        "external-dom-script"
        "external-runtime-script"
        "external-css"

      // for copy-to-output only
      // fileType: "image/png"
    }
    */
  ],
  info: {
    Set: {
      IsOnlyOneAllowed: false,
      CanBeBundled: true,
      IsDeprecated: false,
    },
  },
  properties: [
    {
      type: "check",
      id: "enabled",
      name: "Enabled",
      desc: "If Enabled, the object will move along the trajectory paths",
      options: {
        initialValue: true,
        interpolatable: false,
      }
    },
    {
      type: "integer",
      id: "velocity",
      name: "Velocity",
      desc: "Speed which the object will move in pixels per second",
      options: {
        initialValue: 100,
        interpolatable: false,
      }
    },
    {
      type: "integer",
      id: "angle",
      name: "Angle",
      desc: "Angle, in degrees, to launch the projectile at",
      options: {
        initialValue: 45,
        interpolatable: false,
      }
    },
    {
      type: "integer",
      id: "gravity",
      name: "Gravity",
      desc: "Force applied every tick, in pixels per second squared",
      options: {
        initialValue: 1000,
        interpolatable: false,
      }
    },
    {
      type: "integer",
      id: "gravityAngle",
      name: "Gravity Angle",
      desc: "Angle in which the gravity force will be applied, in degrees",
      options: {
        initialValue: 270,
        interpolatable: false,
      }
    },
    {
      type: "check",
      id: "stopOnSolid",
      name: "Stop On Solid",
      desc: "Stops the projectile movement when colliding with a Solid",
      options: {
        initialValue: true,
        interpolatable: false,
      }
    },
    {
      type: "check",
      id: "setMovementAngle",
      name: "Set Movement Angle",
      desc: "Set movement angle to match the direction of the trajectory",
      options: {
        initialValue: false,
        interpolatable: false,
      }
    },
    /*
    {
      type:
        "integer"
        "float"
        "percent"
        "text"
        "longtext"
        "check"
        "font"
        "combo"
        "group"
        "link"
        "info"

      id: "property_id",
      options: {
        initialValue: 0,
        interpolatable: false,

        // minValue: 0, // omit to disable
        // maxValue: 100, // omit to disable

        // for type combo only
        // items: [
        //   {itemId1: "item name1" },
        //   {itemId2: "item name2" },
        // ],

        // dragSpeedMultiplier: 1, // omit to disable

        // for type link only
        // linkCallback: `function(instOrObj) {}`,
        // linkText: "Link Text",
        // callbackType:
        //   "for-each-instance"
        //   "once-for-type"

        // for type info only
        // infoCallback: `function(inst) {}`,
      },
      name: "Property Name",
      desc: "Property Description",
    }
    */
  ],
  aceCategories: {
    // follows the format id: langName
    // in the ACEs refer to categories using the id, not the name
    general: "General",
    drawing: "Drawing",
    settings: "Settings",
    prediction: "Prediction",
  },
  Acts: {
    SetEnabled:{
      category: "settings",
      forward: "SetEnabled",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "enabled",
          name: "Enabled",
          desc: "Enabled",
          type: "boolean",
          value: "true",
        },
      ],
      listName: "Set Enabled",
      displayText: "{my}: Set Enabled [i]{0}[/i]",
      description: "Sets the behavior as enabled (if true, the object will move along the trajectory paths)",
    },
    SetGravityAngle: {
      category: "settings",
      forward: "SetGravityAngle",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "gravityAngle",
          name: "Gravity Angle",
          desc: "Gravity Angle, in degrees",
          type: "number",
          value: "270",
        },
      ],
      listName: "Set Gravity Angle",
      displayText: "{my}: Set Gravity Angle [i]{0}[/i]",
      description: "Set the angle in which gravity force will be applied, in degrees",
    },
    SetTrajectoryByVelocity: {
      category: "general",
      forward: "SetTrajectoryByVelocity",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "velocity",
          name: "Velocity",
          desc: "Velocity, in pixels per second",
          type: "number",
          value: "100",
        },
        {
          id: "angle",
          name: "Launch Angle",
          desc: "Launch Angle, in degrees",
          type: "number",
          value: "270",
        },
        {
          id: "startInstantly",
          name: "Start Instantly",
          desc: "Start moving along the trajectory instantly",
          type: "boolean",
          value: "true",
        },
        {
          id: "stopOnSolid",
          name: "Stop On Solid",
          desc: "Stops the projectile movement when colliding with a Solid",
          type: "boolean",
          value: "true",
        },
        {
          id: "setMovementAngle",
          name: "Set Movement Angle",
          desc: "Set movement angle to match the direction of the trajectory",
          type: "boolean",
          value: "false",
        }
      ],
      listName: "Set Trajectory By Velocity",
      displayText: "{my}: Set Trajectory By Velocity (Velocity: [b]{0}[/b], Angle: [b]{1}[/b], Start Instantly: [b]{2}[/b], Stop On Soild: [b]{3}[/b], Set Movement Angle: [b]{4}[/b])",
      description: "Calculate the trajectory based on the velocity and launch angle",
    },
    SetTrajectoryByTarget: {
      category: "general",
      forward: "SetTrajectoryByTarget",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "targetX",
          name: "Target X",
          desc: "Target X",
          type: "number",
          value: "0",
        },
        {
          id: "targetY",
          name: "Target Y",
          desc: "Target Y",
          type: "number",
          value: "0",
        },
        {
          id: "time",
          name: "Time",
          desc: "Time, in seconds",
          type: "number",
          value: "1",
        },
        {
          id: "startInstantly",
          name: "Start Instantly",
          desc: "Start moving along the trajectory instantly",
          type: "boolean",
          value: "true",
        },
        {
          id: "stopOnSolid",
          name: "Stop On Solid",
          desc: "Stops the projectile movement when colliding with a Solid",
          type: "boolean",
          value: "true",
        },
        {
          id: "setMovementAngle",
          name: "Set Movement Angle",
          desc: "Set movement angle to match the direction of the trajectory",
          type: "boolean",
          value: "false",
        },
        {
          id: "stopOnTargetReached",
          name: "Stop On Target Reached",
          desc: "Stop the projectile movement when the target is reached",
          type: "boolean",
          value: "false",
        }
      ],
      listName: "Set Trajectory By Target",
      displayText: "{my}: Set Trajectory to Target (X:[b]{0}[/b], Y:[b]{1}[/b], Time:[b]{2}[/b] seconds, Start Instantly:[b]{3}[/b], Stop On Solid:[b]{4}[/b], Set Movement Angle:[b]{5}[/b], Stop On Target Reached:[b]{6}[/b])",
      description: "Calculate the trajectory based on the target position and time",
    },
    SetTrajectoryByTaregtAngle:{
      category: "general",
      forward: "SetTrajectoryByTaregtAngle",
      autoScriptInterface: true,
      highlight:  false,
      deprecated: false,
      params: [
        {
          id: "targetX",
          name: "Target X",
          desc: "Target X",
          type: "number",
          value: "0",
        },
        {
          id: "targetY",
          name: "Target Y",
          desc: "Target Y",
          type: "number",
          value: "0",
        },
        {
          id: "angle",
          name: "Launch Angle",
          desc: "Launch Angle, in degrees",
          type: "number",
          value: "270",
        },
        {
          id: "startInstantly",
          name: "Start Instantly",
          desc: "Start moving along the trajectory instantly",
          type: "boolean",
          value: "true",
        },
        {
          id: "stopOnSolid",
          name: "Stop On Solid",
          desc: "Stops the projectile movement when colliding with a Solid",
          type: "boolean",
          value: "true",
        },
        {
          id: "setMovementAngle",
          name: "Set Movement Angle",
          desc: "Set movement angle to match the direction of the trajectory",
          type: "boolean",
          value: "false",
        },
        {
          id: "stopOnTargetReached",
          name: "Stop On Target Reached",
          desc: "Stop the projectile movement when the target is reached",
          type: "boolean",
          value: "false",
        }
      ],
      listName: "Set Trajectory By Target Angle",
      displayText: "{my}: Set Trajectory to Target (X:[b]{0}[/b], Y:[b]{1}[/b], Angle:[b]{2}[/b] degrees, Start Instantly:[b]{3}[/b], Stop On Solid:[b]{4}[/b], Set Movement Angle:[b]{5}[/b], Stop On Target Reached:[b]{6}[/b])",
      description: "Calculate the trajectory based on the target position and launch angle",
    },
    DrawTrajectory: {
      category: "drawing",
      forward: "DrawTrajectoryLine",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "sprite",
          name: "Sprite",
          desc: "The Sprite used to draw the trajectory",
          type: "object",
          allowedPluginIds: ["Sprite", "TiledBg"]
        },
        {
          id: "layer",
          name: "Layer",
          desc: "The Layer used to draw the trajectory",
          type: "layer",
        },
        {
          id: "steps",
          name: "Steps",
          desc: "The number of steps to draw",
          type: "number",
          value: "10",
        },
        {
          id: 'time',
          name: 'Time',
          desc: 'Time, in seconds to draw',
          type: 'number',
          value: '1',
        },
        {
          id: "setSpriteAngle",
          type: "boolean",
          name: "Set Sprite Angle",
          desc: "Set Sprite direction angle to match the direction of the trajectory",
          value: false,
        }
      ],
      listName: "Draw Trajectory",
      displayText: "{my}: Draw Trajectory using [b]{0}[/b] with [b]{2}[/b] Steps, on Layer [b]{1}[/b] (Time [b]{3}[/b], Set Sprite Angle [b]{4}[/b])",
      description: "Draw the trajectory using a Sprite",
    },
    DrawTrajectoryWithEndSprite: {
      category: "drawing",
      forward: "DrawTrajectoryLineWithEndSprite",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "sprite",
          name: "Sprite",
          desc: "The Sprite used to draw the trajectory",
          type: "object",
          allowedPluginIds: ["Sprite", "TiledBg"]
        },
        {
          id: "endSprite",
          name: "End Cap Sprite",
          desc: "The Sprite to draw at the end of the trajectory path",
          type: "object",
          allowedPluginIds: ["Sprite", "TiledBg"]
        },
        {
          id: "layer",
          name: "Layer",
          desc: "The Layer used to draw the trajectory",
          type: "layer",
        },
        {
          id: "steps",
          name: "Steps",
          desc: "The number of steps to draw",
          type: "number",
          value: "10",
        },
        {
          id: 'time',
          name: 'Time',
          desc: 'Time, in seconds to draw of the trajectory',
          type: 'number',
          value: '1',
        },
        {
          id: "setSpriteAngle",
          type: "boolean",
          name: "Set Sprite Angle",
          desc: "Set sprite direction angle to match the direction of the trajectory",
          value: false,
        }
      ],
      listName: "Draw Trajectory With End Sprite",
      displayText: "{my}: Draw Trajectory using [b]{0}[/b] with [b]{3}[/b] Steps, on Layer [b]{2}[/b] (End Sprite [b]{1}[/b], Time [b]{4}[/b], Set Sprite Angle [b]{5}[/b])",
      description: "Draw the trajectory using a Sprite and an end cap Sprite",
    },
    ClearDrawnTrajectory: {
      category: "drawing",
      forward: "ClearDrawnTrajectory",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      listName: "Clear Drawn Trajectory",
      displayText: "{my}: Clear Drawn Trajectory",
      description: "Clear the drawn trajectory",
    },
    PredictTrajectoryCollision: {
      category: "prediction",
      forward: "PredictTrajectoryCollision",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "steps",
          name: "Steps",
          desc: "The number of steps to predict",
          type: "number",
          value: "10",
        },
        {
          id: "time",
          name: "Time",
          desc: "Time, in seconds",
          type: "number",
          value: "1",
        }
      ],
      listName: "Predict Trajectory Collision",
      displayText: "{my}: Predict Trajectory Collision (Steps: [b]{0}[/b], Time: [b]{1}[/b])",
      description: "Predict where a collision with a solid object will occur along the trajectory",
    },
    StartTrajectory: {
      category: "general",
      forward: "StartTrajectory",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      listName: "Start Trajectory",
      displayText: "{my}: Start Trajectory",
      description: "Start moving along predefined the trajectory",
    },
    StopTrajectory: {
      category: "general",
      forward: "StopTrajectory",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      listName: "Stop Trajectory",
      displayText: "{my}: Stop Trajectory",
      description: "Stop moving along the trajectory",
    },
    LoadFromJSON: {
      category: "general",
      forward: "LoadFromJSON",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "json",
          name: "JSON",
          desc: "JSON",
          type: "string",
          value: "",
        },
      ],
      listName: "Load From JSON",
      displayText: "{my}: Load From JSON [i]{0}[/i]",
      description: "Load the trajectory data from a JSON string",
    }
    /*
    SampleAction: {
      // The category of the action as it appears in the add action dialog
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this action
      // Cases where you might not want this are:
      // 1- If the action params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the action in the add action dialog
      highlight: true,

      // Set to true to hide the action in the interface. False by default if not specified.
      deprecated: false,

      // Marks the action as async. Defaults to false if not specified.
      isAsync: false,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          value: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the action as it appears in the add action dialog
      listName: "Sample Action",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      // You can also use the {my} tag to include the behavior icon and name.
      displayText: "{my}: Sample action [i]{0}[/i]",

      // The description of the action as it appears in the add action dialog
      description: "This is a sample action",
    },
    */
  },
  Cnds: {
    IsEnabled: {
      category: "settings",
      forward: "IsEnabled",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      listName: "Is Enabled",
      displayText: "{my}: Is Enabled",
      description: "Check if the trajectory behavior is enabled",
    },
    OnHitSolid: {
      category: "general",
      forward: "OnHitSolid",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      isTrigger: true,
      listName: "On Hit Solid",
      displayText: "{my}: On Hit Solid",
      description: "Triggered when the projectile hits a solid object",
    },
    OnStartMovingAlongTrajectory: {
      category: "general",
      forward: "OnStartMovingAlongTrajectory",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      isTrigger: true,
      listName: "On Start Moving Along Trajectory",
      displayText: "{my}: On Start Moving Along Trajectory",
      description: "Triggered when the object starts moving along the trajectory",
    },
    IsMovingAlongTrajectory: {
      category: "general",
      forward: "IsMovingAlongTrajectory",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      listName: "Is Moving Along Trajectory",
      displayText: "{my}: Is Moving Along Trajectory",
      description: "ICheck if the object is moving along the trajectory",
    },
    ForEachStepInTrajectory: {
      category: "general",
      forward: "ForEachStepInTrajectory",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "steps",
          name: "Steps",
          desc: "The number of steps to iterate",
          type: "number",
          value: "10",
        },
        {
          id: "time",
          name: "Time",
          desc: "Time, in seconds",
          type: "number",
          value: "1",
        }
      ],
      isLooping: true,
      listName: "For Each Step In Trajectory",
      displayText: "{my}: For Each Step In Trajectory (Steps: [b]{0}[/b], Time: [b]{1}[/b])",
      description: "Loop through each step in the trajectory",
    },
    OnPredictedCollision: {
      category: "prediction",
      forward: "OnPredictedCollision",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      isTrigger: true,
      listName: "On Predicted Collision Found",
      displayText: "{my}: On Predicted Collision Found",
      description: "Triggered when the 'Predict Trajectory Collision' action finds a collision with a solid object",
    },
    NoPredictedCollisionFound: {
      category: "prediction",
      forward: "NoPredictedCollisionFound",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isTrigger: true,
      params: [],
      listName: "No Predicted Collision Found",
      displayText: "{my}: No Predicted Collision Found",
      description: "Triggerd when the 'Predict Trajectory Collision' action does not find a collision with a solid object",
    },
    OnTargetReached: {
      category: "general",
      forward: "OnTargetReached",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      isTrigger: true,
      listName: "On Target Reached",
      displayText: "{my}: On Target Reached",
      description: "Triggered when the object reaches the target position",
    },
    /*
    SampleCondition: {
      // The category of the action as it appears in the add condition dialog
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this condition
      // Cases where you might not want this are:
      // 1- If the condition params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the condition in the add condition dialog
      highlight: true,

      // Set to true to hide the condition in the interface. False by default if not specified.
      deprecated: false,

      // special conditions properties. These can all be omitted, and they will default to the following values:
      isTrigger: false,
      isFakeTrigger: false,
      isStatic: false,
      isLooping: false,
      isInvertible: true,
      isCompatibleWithTriggers: true,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          value: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the condition as it appears in the add condition dialog
      listName: "Sample Condition",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      // You can also use the {my} tag to include the behavior icon and name.
      displayText: "{my}: Sample condition [i]{0}[/i]",

      // The description of the condition as it appears in the add condition dialog
      description: "This is a sample condition",
    },
    */
  },
  Exps: {
    GetXAt: {
      category: "general",
      forward: "GetXAt",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "time",
          name: "Time",
          desc: "Time, in seconds",
          type: "number",
          value: "0",
        },
      ],
      returnType: "number",
      listName: "Get X At",
      displayText: "{my}: Get X At [i]{0}[/i]",
      description: "Get the X position at a given time, in seconds",
    },
    GetYAt: {
      category: "general",
      forward: "GetYAt",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "time",
          name: "Time",
          desc: "Time, in seconds",
          type: "number",
          value: "0",
        },
      ],
      returnType: "number",
      listName: "Get Y At",
      displayText: "{my}: Get Y At [i]{0}[/i]",
      description: "Get the Y position at a given time, in seconds",
    },
    GetVelocityX: {
      category: "general",
      forward: "GetVelocityX",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      returnType: "number",
      listName: "Get Velocity X",
      displayText: "{my}: Get Velocity X",
      description: "Get the current velocity X, in pixels per second",
    },
    GetVelocityY: {
      category: "general",
      forward: "GetVelocityY",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      returnType: "number",
      listName: "Get Velocity Y",
      displayText: "{my}: Get Velocity Y",
      description: "Get the current velocity Y, in pixels per second",
    },
    GetAngleAt: {
      category: "general",
      forward: "GetAngleAt",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [
        {
          id: "time",
          name: "Time",
          desc: "Time, in seconds",
          type: "number",
          value: "0",
        },
      ],
      returnType: "number",
      listName: "Get Angle At",
      displayText: "{my}: Get Angle At [i]{0}[/i]",
      description: "Get the angle at a given time, in seconds",
    },
    GetMaxHeight: {
      category: "general",
      forward: "MaxHeight",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      returnType: "number",
      listName: "Get Max Height",
      displayText: "{my}: Get Max Height",
      description: "Get the maximum height of the trajectory, in pixels",
    },
    GetLoopTimeStep: {
      category: "general",
      forward: "LoopTimeStep",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [],
      returnType: "number",
      listName: "Get Loop Time Step",
      displayText: "{my}: Get Loop Time Step",
      description: "Get the time step, in seconds, between each loop iteration",
    },
    GetLoopX: {
      category: "general",
      forward: "LoopX",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "number",
      listName: "Get Loop X",
      displayText: "{my}: Get Loop X",
      description: "Get the current X position, between each loop iteration",
    },
    GetLoopY: {
      category: "general",
      forward: "LoopY",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "number",
      listName: "Get Loop Y",
      displayText: "{my}: Get Loop Y",
      description: "Get the current Y position, between each loop iteration",
    },
    GetLoopAngle: {
      category: "general",
      forward: "LoopAngle",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "number",
      listName: "Get Loop Angle",
      displayText: "{my}: Get Loop Angle",
      description: " Get the current angle, in degrees, between each loop iteration",
    },
    GetCollisionX: {
      category: "prediction",
      forward: "CollisionX",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "number",
      listName: "Get Collision X",
      displayText: "{my}: Get Collision X",
      description: "Get X position from Predicted Trajectory Collision",
    },
    GetCollisionY: {
      category: "prediction",
      forward: "CollisionY",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "number",
      listName: "Get Collision Y",
      displayText: "{my}: Get Collision Y",
      description: "Get Y position from Predicted Trajectory Collision",
    },
    Time : {
      category: "general",
      forward: "Time",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "number",
      listName: "Get Time",
      displayText: "{my}: Get Time",
      description: "Get the last trajectory's time, in seconds, if no time was set, returns -1",
    },
    TargetX : {
      category: "general",
      forward: "TargetX",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "number",
      listName: "Get Target X",
      displayText: "{my}: Get Target X",
      description: "Get the last trajectory's target X, if no target was set, returns -1",
    },
    TargetY : {
      category: "general",
      forward: "TargetY",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "number",
      listName: "Get Target Y",
      displayText: "{my}: Get Target Y",
      description: "Get the last trajectory's target Y, if no target was set, returns -1",
    },
    Velocity : {
      category: "general",
      forward: "Velocity",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "number",
      listName: "Get Velocity",
      displayText: "{my}: Get Velocity",
      description: "Get the last trajectory's velocity, in pixels per second",
    },
    LaunchAngle : {
      category: "general",
      forward: "LaunchAngle",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "number",
      listName: "Get Launch Angle",
      displayText: "{my}: Get Launch Angle",
      description: "Get the last trajectory's launch angle, in degrees",
    },
    AsJSON: {
      category: "general",
      forward: "AsJSON",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      params: [ ],
      returnType: "string",
      listName: "Get Trajectory As JSON",
      displayText: "{my}: Get Trajectory As JSON",
      description: "Get the trajectory data as a JSON string",
    }
    /*
    SampleExpression: {
      // The category of the action as it appears in the expression picker
      category: "general",

      // Forward to the instance function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this expression
      // Cases where you might not want this are:
      // 1- If you don't want it to appear in the script interface
      // 2- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the expression in the expression picker
      highlight: true,

      // Set to true to hide the expression in the interface. False by default if not specified.
      deprecated: false,

      // The type of the expression.
      returnType:
        - "string"
        - "number"
        - "any" // must be either string or number

      // Set to true if the expression is variadic. False by default if not specified.
      isVariadicParameters: false

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
        },
      ],

      // The description of the expression as it appears in the expression picker
      description: "This is a sample expression",
    },
    */
  },
};