import { createContext, useContext, useState } from "react";
import { initialDocuments } from "./portalData.js";

const DocumentsContext = createContext(null);

export function DocumentsProvider({ children }) {
  const [documents, setDocuments] = useState(initialDocuments);

  const addDocument = (doc) => setDocuments((prev) => [doc, ...prev]);
  const updateDocument = (id, patch) =>
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...patch } : d))
    );
  const removeDocument = (id) =>
    setDocuments((prev) => prev.filter((d) => d.id !== id));

  return (
    <DocumentsContext.Provider
      value={{ documents, addDocument, updateDocument, removeDocument }}
    >
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const ctx = useContext(DocumentsContext);
  if (!ctx) {
    throw new Error("useDocuments must be used within DocumentsProvider");
  }
  return ctx;
}
