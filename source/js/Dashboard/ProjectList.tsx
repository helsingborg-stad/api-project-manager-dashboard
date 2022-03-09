import { Box, Button, Link, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { Check, ExpandLess, ExpandMore, Link as LinkIcon, OpenInNew } from "@mui/icons-material"
import DashboardContext from "./model/DashboardContext";
import { formatDate, formatFunds } from "./formatting";
import DashboardConfigContext from "./DashboardConfigContext";

const createContentLinkFactory = (contentEndpoint: string) => {
    const endpoint = contentEndpoint.endsWith('/') ? contentEndpoint : `${contentEndpoint}/`
    return (slug: string) => `${endpoint}${slug}`
}

export default function ProjectList () {
    const {
        graph    
    } = useContext(DashboardContext)
    const {contentEndpoint} = useContext(DashboardConfigContext)
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => setExpanded(!expanded)
    const contentLink = useCallback(createContentLinkFactory(contentEndpoint), [contentEndpoint])
    const createCsvContent = () => {
        const headerRows = [
            [
                'Titel', 'Skapad', 'Uppdaterad', 'Summa beviljade medel', 'Summa använda medel', 
                'Stadsgemensamt', 'Utmanar kärnverksamhet',
                'Utmaningskategorier', 'Utmaningar',
                'Föväntad effekt', 'Mål', 'Effektmål',
                'Innovationshöjd',' Organisationer', 'Deltagare', 'Partners', 'Sektorer', 'Status', 'Teknologier'
            ]
        ]
        const dataRows = graph.projects
            .map(project => ([
                project.summary.title,
                formatDate(project.summary.created),
                formatDate(project.summary.modified),
                project.fundsGranted.toString(),
                project.fundsUsed.toString(),
                project.summary.isCityWide ? 'ja' : 'nej',
                project.summary.isChallengingCoreBusiness ? 'ja' : 'nej',
                project.challengeCategories.join(';'),
                project.challenges.join(';'),
                project.expectedImpacts.join(';'),
                project.globalGoals.join(';'),
                project.impactGoals.join(';'),
                project.innovationPotentials.join(';'),
                project.organisations.join(';'),
                project.participants.join(';'),
                project.partners.join(';'),
                project.sectors.join(';'),
                project.status.join(';'),
                project.technologies.join(';')
            ]))
        return headerRows
            .concat(dataRows)
            .map(columns => columns.join('\t'))
            .join('\r\n')
    }

    const downloadCsv = (filename: string) => {
        const blob = new Blob([createCsvContent()], {type: 'text/tsv'});
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    /*
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else{
            const elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
        }
        */
    }

    const formatFlag = (b: boolean) => b && <Check/>
    const header = () => (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: 1 }}/>
            <Box>
                <Button variant="text" onClick={toggleExpanded}>
                    {expanded ? <ExpandLess /> : <ExpandMore />}
                    VISA INITIATIV</Button>
                <Button variant="text" onClick={() => downloadCsv('innovationer.csv')}>EXPORTERA TILL CSV</Button>
            </Box>
        </Box>)
    return (
        <>
            {header()}
            {expanded && <TableContainer>
                <Table aria-label="Innovationsprojekt">
                    <TableHead>
                        <TableRow>
                            <TableCell>Titel</TableCell>
                            <TableCell>Summa beviljade medel</TableCell>
                            <TableCell>Summa använda medel</TableCell>
                            <TableCell>Stadsgemensamt</TableCell>
                            <TableCell>Utmanar kärnverksamhet</TableCell>
                            <TableCell>Skapad</TableCell>
                            <TableCell>Uppdaterad</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {graph.projects.map(project => (
                            <TableRow key={project.slug}>
                                <TableCell>
                                    <Link href={contentLink(project.slug)} target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <OpenInNew/>&nbsp;{project.summary.title}
                                    </Link>
                                </TableCell>
                                <TableCell>{formatFunds(project.fundsGranted)}</TableCell>
                                <TableCell>{formatFunds(project.fundsUsed)}</TableCell>
                                <TableCell>{formatFlag(project.summary.isCityWide)}</TableCell>
                                <TableCell>{formatFlag(project.summary.isChallengingCoreBusiness)}</TableCell>
                                <TableCell>{formatDate(project.summary.created)}</TableCell>
                                <TableCell>{formatDate(project.summary.modified)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={7} sx={{ textAlign: 'right' }}>
                                <Button variant="text" onClick={toggleExpanded}>
                                    <ExpandLess />
                                    DÖLJ INITIATIV
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>}
        </>)
}