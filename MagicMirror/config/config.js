/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: 'MMM-OnScreenMenu',
            position: 'top_right',
			config: {
                touchMode: true,
               	enableKeyboard: false,
				menuItems: { 
					minimize: { title: "Minimize", icon: "window-minimize" },
					},
			}
		},

		{
  			module: "MMM-WeatherBackground",
  			// don't assign position.
  			config: {
    			verbose: true, // If you want to leave some log message, set this as true
    			source: "weather", // "weather", "MMM-NOAA3", "MMM-DarkskyForecast".  If you want to use different source, manually set `notification` and `payloadConverter`			
    			size: null, // "1920x480", whatever....			
    			hemisphere: "n", // 'n', 's' or null/false  (For backward compatibility) //will be deprecated. use monthMap instead.
    			monthMap: ['NewYear', 'winter', 'spring', 'spring flower', 'joy', 'summer rain', 'summer beach', 'summer vacation', 'autumn', 'autumn leaves', 'winter', 'christmas'], // set your custom keyword for each month.			
    			//monthMap: ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'],// 			
    			//monthMap: null, false, or []			
    			targetDOM: ".fullscreen.below", //null or DomSelector for target. (if null, weather will be targeted.)			
    			notification: null, // when you need another `source` from `source, modify this.			
    			payloadConverter: null, // your custom payloadConverter callback.
    			defaultCollection: null, // When matched collection not found, this will be used.			
    			externalCollections: "collections.json", // or null. // I recommend you rename this file to prevent update-conflicts.
    			collections: {}, // This will be combined with externalCollections. (For backward compatibility)
    		}
		},

		{
			module: "alert",
		},

		{
			module: "updatenotification",
			position: "top_bar"
		},

		{
			module: "clock",
			position: "top_left"
		},

		{
			module: "weather",
			position: "top_left",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Baltimore",
				locationID: "4347778", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "f1c19627479b1e6871904373d70b9c50"
			}
		},

		{
			module: "weather",
			position: "top_left",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Baltimore",
				locationID: "4347778", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "f1c19627479b1e6871904373d70b9c50",
				roundTemp: true
			}
		},

		{
    		module: "MMM-pihole-stats",
    		position: "top_right", // Or any valid MagicMirror position.
    		config: {
    			apiURL: "http://10.1.10.6/admin/api.php"
      			// apiToken: "0123456789abcdef" // See 'Configuration options' for more information.
      		}
      	},

		{
			module: "MMM-Carousel",
			position: "bottom_bar",
			config: {
				mode: "slides",
				transitionInterval: 120000,
				showPageIndicators: true,
				showPageControls: false,
				ignoreModules: ['MMM-OnScreenMenu'], ['MMM-WeatherBackground'],
				slides: {
					main: ['clock', 'weather'],
					1: ['clock', 'MMM-pihole-stats']
			}
		}

	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
