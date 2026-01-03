"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { DocumentContent } from "@/lib/services/document-service"

interface Document {
  id: string
  title: string
  templateId: string
  content: DocumentContent
  folderId?: string | null
  createdAt: string
  updatedAt: string
}

interface UseDocumentOptions {
  autoSave?: boolean
  autoSaveInterval?: number
}

export function useDocument(documentId?: string, options: UseDocumentOptions = {}) {
  const { autoSave = true, autoSaveInterval = 30000 } = options
  
  const [document, setDocument] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  
  const lastSavedContent = useRef<string>("")
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null)

  // Load document
  const loadDocument = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const res = await fetch(`/api/documents/${id}`)
      if (!res.ok) {
        throw new Error("Failed to load document")
      }
      const data = await res.json()
      setDocument(data)
      lastSavedContent.current = JSON.stringify(data.content)
      setHasUnsavedChanges(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load document")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save document
  const saveDocument = useCallback(async () => {
    if (!document) return
    
    setIsSaving(true)
    setError(null)
    
    try {
      const res = await fetch(`/api/documents/${document.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: document.title,
          content: document.content,
        }),
      })
      
      if (!res.ok) {
        throw new Error("Failed to save document")
      }
      
      const updated = await res.json()
      setDocument(updated)
      lastSavedContent.current = JSON.stringify(updated.content)
      setHasUnsavedChanges(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save document")
    } finally {
      setIsSaving(false)
    }
  }, [document])


  // Create new document
  const createDocument = useCallback(async (
    title: string,
    templateId: string,
    content: DocumentContent
  ) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, templateId, content }),
      })
      
      if (!res.ok) {
        throw new Error("Failed to create document")
      }
      
      const data = await res.json()
      setDocument(data)
      lastSavedContent.current = JSON.stringify(data.content)
      setHasUnsavedChanges(false)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create document")
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update document locally
  const updateDocument = useCallback((updates: Partial<Document>) => {
    setDocument(prev => {
      if (!prev) return prev
      const updated = { ...prev, ...updates }
      const currentContent = JSON.stringify(updated.content)
      setHasUnsavedChanges(currentContent !== lastSavedContent.current)
      return updated
    })
  }, [])

  // Update content
  const updateContent = useCallback((content: DocumentContent) => {
    updateDocument({ content })
  }, [updateDocument])

  // Update title
  const updateTitle = useCallback((title: string) => {
    updateDocument({ title })
  }, [updateDocument])

  // Auto-save effect
  useEffect(() => {
    if (!autoSave || !hasUnsavedChanges || !document) return

    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current)
    }

    autoSaveTimer.current = setTimeout(() => {
      saveDocument()
    }, autoSaveInterval)

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current)
      }
    }
  }, [autoSave, autoSaveInterval, hasUnsavedChanges, document, saveDocument])

  // Load document on mount if ID provided
  useEffect(() => {
    if (documentId) {
      loadDocument(documentId)
    }
  }, [documentId, loadDocument])

  return {
    document,
    isLoading,
    isSaving,
    error,
    hasUnsavedChanges,
    loadDocument,
    saveDocument,
    createDocument,
    updateDocument,
    updateContent,
    updateTitle,
  }
}
