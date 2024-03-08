import React from 'react'
import { Paper } from '@material-ui/core'
import styles from './initial.module.css'
import useGetSectionTypeLabel from '../../hooks/commons/useGetSectionTypeLabel';

export default function InitialMessage(): React.ReactElement {
    const { sectionName } = useGetSectionTypeLabel();
    return (
        <div className={styles.containerInit}>
            <Paper elevation={1} className={styles.paperInit}>
                <h2>SEMIS - {sectionName} Tranfer</h2>
                <span>Follow the instructions to proceed:</span>
                <ul>
                    <li className={styles.paperOtherText}>Select the  Organization unit you want to view data</li>
                    <li className={styles.paperOtherText}>Use global filters(Class, Grade and Academic Year)</li>
                </ul>
                <span>How to perform operations:</span>
                <ul>
                    <li className={styles.paperOtherText}><strong>Outgoing Transfer:</strong>   Select <i>outgoing</i>  tab and view outgoing {sectionName} transfer list.</li>
                    <li className={styles.paperOtherText}><strong>Incoming Transfer</strong>  Select <i>incoming</i> tab:
                        <div className={styles.instructionsText}> <strong>Approve:</strong> Choose the {sectionName} for whom you want to approve the transfer to the selected school, click on the approve button, then confirm.</div>
                        <div className={styles.instructionsText}> <strong>Reject:</strong> Choose the {sectionName} for whom you want to reject the transfer to the selected school, click on the reject button, then confirm.</div>
                    </li>
                </ul>
            </Paper>
        </div>
    )
}
