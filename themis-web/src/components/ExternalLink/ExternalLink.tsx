import { Chip } from '@mui/material'
import { OpenInNew } from '@mui/icons-material';

interface ExternalLinkProps {
    label: string;
    href: string;
}
export function ExternalLink(props: ExternalLinkProps) {
    const disableClick = (event: { stopPropagation: () => void; }) => {
        event.stopPropagation();
    }
    return <Chip
        onClick={disableClick}
        label={props.label}
        component="a"
        href={props.href}
        target="_blank"
        icon={<OpenInNew fontSize="small"/>}
        clickable
    />
}