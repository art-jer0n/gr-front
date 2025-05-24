import { TradeMission } from "interfaces/trade-mission";
import { TradeMissionDocument } from "interfaces/trade-mission-document";

export interface TradeMissionEditBlockProps {

    tradeMissions: TradeMission[]
    tradeMissionLoading: boolean;
    onChangeTradeMissions: (tradeMissions: TradeMission[]) => void;

    tradeMissionDocuments: TradeMissionDocument[];
    tradeMissionDocumentLoading: boolean;
    onChangeTradeMissionDocuments: (documents: TradeMissionDocument[]) => void;
}

