import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Document, DocumentContent, SectionContent, DocumentTemplate } from '@/types';
import { generateId, formatDate } from '@/lib/utils';

interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
  apiKey: string;

  // Actions
  setApiKey: (key: string) => void;
  createDocument: (template: DocumentTemplate, initialContent?: Partial<DocumentContent>) => Document;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  updateDocumentContent: (id: string, content: Partial<DocumentContent>) => void;
  updateSection: (documentId: string, sectionId: string, content: string) => void;
  deleteDocument: (id: string) => void;
  setCurrentDocument: (document: Document | null) => void;
  loadDocument: (id: string) => Document | undefined;
  saveDocument: (document: Document) => void;
}

export const useDocumentStore = create<DocumentState>()(
  persist(
    (set, get) => ({
      documents: [],
      currentDocument: null,
      apiKey: '',

      setApiKey: (key) => set({ apiKey: key }),

      createDocument: (template, initialContent) => {
        const now = new Date().toISOString();

        const sections: SectionContent[] = template.structure.map((section) => ({
          sectionId: section.id,
          title: section.title,
          content: '',
          charts: [],
        }));

        const content: DocumentContent = {
          title: initialContent?.title || `New ${template.name}`,
          subtitle: initialContent?.subtitle || '',
          author: initialContent?.author || '',
          organization: initialContent?.organization || '',
          date: formatDate(new Date()),
          sections,
          ...initialContent,
        };

        const document: Document = {
          id: generateId(),
          templateId: template.id,
          content,
          createdAt: now,
          updatedAt: now,
          status: 'draft',
        };

        set((state) => ({
          documents: [...state.documents, document],
          currentDocument: document,
        }));

        return document;
      },

      updateDocument: (id, updates) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id
              ? { ...doc, ...updates, updatedAt: new Date().toISOString() }
              : doc
          ),
          currentDocument:
            state.currentDocument?.id === id
              ? { ...state.currentDocument, ...updates, updatedAt: new Date().toISOString() }
              : state.currentDocument,
        }));
      },

      updateDocumentContent: (id, contentUpdates) => {
        set((state) => {
          const updateDoc = (doc: Document): Document => {
            if (doc.id !== id) return doc;
            return {
              ...doc,
              content: { ...doc.content, ...contentUpdates },
              updatedAt: new Date().toISOString(),
            };
          };

          return {
            documents: state.documents.map(updateDoc),
            currentDocument: state.currentDocument
              ? updateDoc(state.currentDocument)
              : null,
          };
        });
      },

      updateSection: (documentId, sectionId, content) => {
        set((state) => {
          const updateDoc = (doc: Document): Document => {
            if (doc.id !== documentId) return doc;
            return {
              ...doc,
              content: {
                ...doc.content,
                sections: doc.content.sections.map((section) =>
                  section.sectionId === sectionId
                    ? { ...section, content }
                    : section
                ),
              },
              updatedAt: new Date().toISOString(),
            };
          };

          return {
            documents: state.documents.map(updateDoc),
            currentDocument: state.currentDocument
              ? updateDoc(state.currentDocument)
              : null,
          };
        });
      },

      deleteDocument: (id) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id),
          currentDocument:
            state.currentDocument?.id === id ? null : state.currentDocument,
        }));
      },

      setCurrentDocument: (document) => {
        set({ currentDocument: document });
      },

      loadDocument: (id) => {
        const document = get().documents.find((doc) => doc.id === id);
        if (document) {
          set({ currentDocument: document });
        }
        return document;
      },

      saveDocument: (document) => {
        set((state) => {
          const exists = state.documents.some((doc) => doc.id === document.id);
          if (exists) {
            return {
              documents: state.documents.map((doc) =>
                doc.id === document.id ? document : doc
              ),
              currentDocument: document,
            };
          } else {
            return {
              documents: [...state.documents, document],
              currentDocument: document,
            };
          }
        });
      },
    }),
    {
      name: 'elite-doc-storage',
      partialize: (state) => ({
        documents: state.documents,
        apiKey: state.apiKey,
      }),
    }
  )
);
