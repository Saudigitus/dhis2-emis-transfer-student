import { useState, useCallback } from "react";
import { useGetEvent } from "./useGetEvent";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";

interface Event {
    event: any;
}

export function useGetEventsByEnrollment() {
    const { getEvent } = useGetEvent();
    const { program } = getDataStoreKeys();
    const [loading, setLoading] = useState(false);
    const [eventsForTransfer, setEventsForTransfer] = useState<Event[]>([]);

    const getEventsByEnrollment = useCallback(async (enrollment: string, trackedEntity: string, programStagesToTransfer: string[]) => {
        setLoading(true);

        const eventPromises = programStagesToTransfer.map(stage =>
            getEvent(program, stage, [], trackedEntity, "*")
                .then(response => {
                    const event = response?.results?.instances?.find((instance: any) => instance.enrollment === enrollment);
                    return event;
                })
                .catch(() => {
                    return null;
                })
        );

        const events = await Promise.all(eventPromises);
        setEventsForTransfer(events);
        setLoading(false);

    }, [getEvent, program]);

    return { events: eventsForTransfer, getEventsByEnrollment, loading };
}
