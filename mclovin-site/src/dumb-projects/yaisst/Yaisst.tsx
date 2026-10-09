import { LightstreamerClient } from "lightstreamer-client-web";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as satellite from 'satellite.js';
import Subscriber from "./Subscriber";

async function fetchTle (): Promise<[string, string]> {
    const url = "https://live.ariss.org/iss.txt";
    const res = await fetch (url);
    const resText = await res.text();
    const tleLines = resText.trim().split("\n");

    return [tleLines[1], tleLines[2]]
}

const tle = await fetchTle();

// 0 Urine Tank qty %
// 1 active core laptop count
// 2 ISS total mass 
// 3 Cabin temperature
// 4 Cabin pressure
// 5 Waste Water qty %
// 6 Clean water qty %
const SUB_LIST: string[] = ["NODE3000005", "USLAB000087", "USLAB000039", "USLAB000059", "USLAB000058", "NODE3000008", "NODE3000009"];
const SUB_LIST_LABELS: string[] = ["Urine Tank Qty%", "Active laptop count", "Total Mass", "Cabin Temperature", "Cabin Pressure", "Waste Water Qty%", "Clean Water Qty%"];
const URL:string = "https://push.lightstreamer.com";
const ADAPTER_SET: string = "ISSLIVE";
const MAX_BANDWIDTH: number = 0.1; // Maximum update frequency in updates per second
export const INTERVAL = 1000;

const client = new LightstreamerClient(URL, ADAPTER_SET);
const subscriber = new Subscriber();

client.addListener({
    // Debug listener to prove connection to ISSLIVE
    onStatusChange: (status) => {
        console.debug("Status:", status);
    },

    onServerError: (errorCode) => {
        console.error(`Connection failed with error code: ${errorCode}`)
    }
});

// Connect client with server
client.connect();

//Record to hold key-value pairs
type TelemetryMap = Record<string, string | null>;

interface FullTelemetryContext {
    telemetry: TelemetryMap;
    location: {
        latitude: number,
        longitude: number,
        altitude: number
    } | null;
    orbit: {
        inclination: number,
        eccentricity: number,
        ascendingNode: number
    } | null;
};

const TelemetryContext = createContext<FullTelemetryContext | undefined>(undefined);

export const TelemetryProvider = ({
    children,
    tle
}: {
    children: React.ReactNode;
    tle: [string, string];
}) => {
    // define telemetry state
    const [telemetry, setTelemetry] = useState<TelemetryMap>({})

    // define location state
    const [location, setLocation] = useState<{
     latitude: number,
     longitude: number,
     altitude: number
    } | null>(null);

    // define orbit state
    const [orbit, setOrbit] = useState<{
        inclination: number,
        eccentricity: number,
        ascendingNode: number
    } | null>(null);

    // Defines the mode and creates a satellite record from the given TLE
    const mode = "MERGE";
    const satrec = satellite.twoline2satrec(tle[0], tle[1])

    useEffect(() => {
        // After calling TelemetryProvider, iterate through SUB_LIST
        SUB_LIST.forEach( (itemName, i) => {
            // Set the listener
            subscriber.setListener(itemName, (value) => {
                // Convert the string into a number, then remove decimal points
                const roundedValue = value !== null ? parseFloat(value).toFixed(0) : null;
                // A lot of nulls I'm noticing, something to fix
                setTelemetry(prev => ({ ...prev, [itemName]: roundedValue }))
            })

            // Subscribe to item
            subscriber.subscribe(client, mode, itemName, SUB_LIST_LABELS[i], MAX_BANDWIDTH);
        })
    }, [])

    useEffect(() => {
        // Defines a function that converts TLEs into usable data, then publishes that data to the context for use elsewhere

        const updatePostition = () => {
            const gmst = satellite.gstime(new Date());
            const positionAndVelocity = satellite.propagate(satrec, new Date());
            const positionEci = positionAndVelocity?.position;
            const geo = satellite.eciToGeodetic(positionEci!, gmst)

            // Rounds the information to the second decimal place
            const newLat = Math.round(satellite.degreesLat(geo.latitude) * 100) / 100;
            const newLong = Math.round(satellite.degreesLong(geo.longitude) * 100) / 100;
            const newAlt = Math.round(geo.height * 100) / 100;

            console.log(`NEW POSITION: ${newLat} ${newLong} ${newAlt}`);

            // set location state using the refined information
            setLocation({
                latitude: newLat,
                longitude: newLong,
                altitude: newAlt
            });
        };

        const newInclo = Math.round((satrec.inclo * (180 / Math.PI)) * 100) / 100;
        const newNode = Math.round((satrec.nodeo * (100 / Math.PI)) * 100) / 100;

        setOrbit({
            inclination: newInclo,
            eccentricity: satrec.ecco,
            ascendingNode: newNode
        });

        updatePostition();

        const interval = setInterval(updatePostition, INTERVAL);

        return () => clearInterval(interval);

    }, [tle])

    return (
        // pushes telemetry, location and orbital information to every child of TelemetryContext
        <TelemetryContext.Provider value={{ telemetry, location, orbit }}>
            {children}
        </TelemetryContext.Provider>
    );
};

export const useTelemetry = () => {
    const context = useContext(TelemetryContext);

    if (!context) {
        throw new Error("useTelemtry must be used within a TelemetryProvider")
    }
    return context;
}

export default function Yaisst() {
    return(
        <>
            <p>hey there</p>
        </>
    )
}