import { LightstreamerClient, Subscription } from "lightstreamer-client-web";

export default class Subscriber {
    private listeners: Record<string, (value: string | null) => void> = {};

    setListener (itemName: string, fn: (value: string | null) => void) {
        this.listeners[itemName] = fn;
    }

    /**
     * Subscribes to items.
     * 
     * @param client client to add subscription to
     * @param mode mode, typically MERGE
     * @param itemName the item to subscribe to
     * @param label user given label, this is for debugging in the console
     * @param bandwidth bandwidth in updates per second, e.g. 0.5 updates per second would give one update every 2 seconds
     */
    subscribe (client: LightstreamerClient, mode: string, itemName: string, label: string, bandwidth: number): void {
        // Create subscription based off of information given
        const sub = new Subscription(mode, itemName, ["Value"]);
        // if set to anything but yes, we don't get an initial value, the value only changes with updates
        sub.setRequestedSnapshot("yes");
        sub.setRequestedMaxFrequency(bandwidth);

        sub.addListener({
            // Subscription confirmation
            onSubscription: () => {
                console.debug(`SUBSCRIPTION SUCCESSFUL : ${itemName} : : ${label}`);
            },

            //Subscription error
            onSubscriptionError: (code: number, message: string) => {
                console.error(`SUBSCRIPTION ERROR: ${code} : ${message}`);
            },

            // Listens for published update.
            onItemUpdate: (update) => {
                // Gets a usable value from an update, then changes the 
                const value = update.getValue("Value");
                const isSnapshot = update.isSnapshot();
                console.log(`${isSnapshot ? "SNAPSHOT" : "UPDATE"}: ${value} - ${label} `);

                if (this.listeners[itemName]) {
                    this.listeners[itemName]?.(value);
                }
            },
        });

        client.subscribe(sub);
    }
}