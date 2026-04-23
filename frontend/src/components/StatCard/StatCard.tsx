import {Badge, Card, IconWrap, Label, Subtitle, Title, TopRow} from "./StatCard.styled.ts";
import type { ReactNode } from "react";

interface Props {
    icon: ReactNode;
    iconBg: string;
    iconColor?: string;
    badge?: string;
    badgeColor?: string;
    label: string;
    title: string;
    subtitle?: string;
    badgeRight?: string;
}

const StatCard = ({ icon, iconBg, iconColor = "#111", badge, badgeColor = '#22c55e', label, title, subtitle, badgeRight }: Props) => {
    return (
        <Card>
            <TopRow>
                <IconWrap bg={iconBg} style={{ color: iconColor }}>
                    {icon}
                </IconWrap>
                {badge && <Badge color={badgeColor}>{badge}</Badge>}
                {badgeRight && <Badge color="#888">{badgeRight}</Badge>}
            </TopRow>
            <div>
                <Label>{label}</Label>
                <Title>
                    {title}
                    {subtitle && <Subtitle>{subtitle}</Subtitle>}
                </Title>
            </div>
        </Card>
    );
};

export default StatCard;
