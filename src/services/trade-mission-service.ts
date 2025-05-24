import { TradeMission } from 'interfaces/trade-mission';
import { TradeMissionDocument } from 'interfaces/trade-mission-document';

const TRADE_MISSION_STORAGE_KEY = 'trade-mission';
const TRADE_MISSION_DOCUMENT_STORAGE_KEY = 'trade-mission-documents';

export const getTradeMissions = (): TradeMission[] => {
    const stored = localStorage.getItem(TRADE_MISSION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const saveTradeMissions = (missions: TradeMission[]): void => {
    localStorage.setItem(TRADE_MISSION_STORAGE_KEY, JSON.stringify(missions));
};

export const generateTradeMissionId = (): number => {
    const missions = getTradeMissions();
    return missions.reduce((max, mission) => Math.max(max, mission.id), 0) + 1;
};

export const addTradeMission = (mission: TradeMission): void => {
    const missions = getTradeMissions();
    missions.push(mission);
    saveTradeMissions(missions);
};

export const updateTradeMission = (mission: TradeMission): void => {
    const missions = getTradeMissions();
    const index = missions.findIndex(_ => _.id === mission.id);

    if (index === -1) {
        return;
    }

    missions[index] = mission;
    saveTradeMissions(missions);
};

export const deleteTradeMission = (missionId: number): void => {
    const missions = getTradeMissions().filter(_ => _.id !== missionId);
    saveTradeMissions(missions);
};

export const getTradeMissionDocuments = (): TradeMissionDocument[] => {
    const stored = localStorage.getItem(TRADE_MISSION_DOCUMENT_STORAGE_KEY);
    return stored ? JSON.parse(stored, (_, value) =>
        typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value) ? new Date(value) : value) : [];
};

export const saveTradeMissionDocuments = (documents: TradeMissionDocument[]): void => {
    localStorage.setItem(TRADE_MISSION_DOCUMENT_STORAGE_KEY, JSON.stringify(documents));
};

export const generateDocumentId = (): number => {
    const documents = getTradeMissionDocuments();
    return documents.reduce((max, doc) => Math.max(max, doc.id), 0) + 1;
};

export const addDocument = (document: TradeMissionDocument): void => {
    const documents = getTradeMissionDocuments();
    document.id = generateDocumentId();
    documents.push(document);
    saveTradeMissionDocuments(documents);
};

export const updateDocument = (updatedDoc: TradeMissionDocument): void => {
    const documents = getTradeMissionDocuments();
    const index = documents.findIndex(_ => _.id === updatedDoc.id);
    if (index !== -1) {
        documents[index] = updatedDoc;
        saveTradeMissionDocuments(documents);
    }
};

export const deleteDocument = (documentId: number): void => {
    const documents = getTradeMissionDocuments().filter(_ => _.id !== documentId);
    saveTradeMissionDocuments(documents);
};

export const getDocumentsByMission = (countryId: number): TradeMissionDocument[] => {
    return getTradeMissionDocuments().filter(_ => _.countryId === countryId);
};
