import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export interface DocumentContent {
  sections: Section[]
  metadata?: DocumentMetadata
}

export interface Section {
  id: string
  title: string
  content: string
  type: "text" | "chart" | "diagram" | "table"
  order: number
}

export interface DocumentMetadata {
  author?: string
  version?: number
}

export interface CreateDocumentInput {
  title: string
  templateId: string
  content: DocumentContent
  folderId?: string
}

export interface UpdateDocumentInput {
  title?: string
  content?: DocumentContent
  folderId?: string | null
}

export interface QueryOptions {
  search?: string
  templateId?: string
  folderId?: string | null
  sortBy?: "createdAt" | "updatedAt" | "title"
  sortOrder?: "asc" | "desc"
  limit?: number
  offset?: number
}

export const documentService = {
  async create(userId: string, data: CreateDocumentInput) {
    return prisma.document.create({
      data: {
        title: data.title,
        templateId: data.templateId,
        content: data.content as Prisma.InputJsonValue,
        userId,
        folderId: data.folderId,
      },
    })
  },

  async update(id: string, userId: string, data: UpdateDocumentInput) {
    // Verify ownership
    const existing = await prisma.document.findFirst({
      where: { id, userId },
    })

    if (!existing) {
      throw new Error("Document not found or access denied")
    }

    return prisma.document.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.content !== undefined && { content: data.content as Prisma.InputJsonValue }),
        ...(data.folderId !== undefined && { folderId: data.folderId }),
      },
    })
  },


  async delete(id: string, userId: string) {
    // Verify ownership
    const existing = await prisma.document.findFirst({
      where: { id, userId },
    })

    if (!existing) {
      throw new Error("Document not found or access denied")
    }

    return prisma.document.delete({
      where: { id },
    })
  },

  async getById(id: string, userId?: string) {
    const where: Prisma.DocumentWhereInput = { id }
    
    // If userId provided, verify ownership
    if (userId) {
      where.userId = userId
    }

    return prisma.document.findFirst({
      where,
      include: {
        folder: true,
      },
    })
  },

  async getByShareToken(shareToken: string) {
    const doc = await prisma.document.findUnique({
      where: { shareToken },
    })

    if (!doc) return null

    // Check if share has expired
    if (doc.shareExpiresAt && doc.shareExpiresAt < new Date()) {
      return null
    }

    return doc
  },

  async getByUser(userId: string, options: QueryOptions = {}) {
    const {
      search,
      templateId,
      folderId,
      sortBy = "updatedAt",
      sortOrder = "desc",
      limit = 50,
      offset = 0,
    } = options

    const where: Prisma.DocumentWhereInput = { userId }

    if (templateId) {
      where.templateId = templateId
    }

    if (folderId !== undefined) {
      where.folderId = folderId
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { path: ["sections"], array_contains: [{ content: search }] } },
      ]
    }

    return prisma.document.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      take: limit,
      skip: offset,
      include: {
        folder: true,
      },
    })
  },

  async search(userId: string, query: string) {
    return prisma.document.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { updatedAt: "desc" },
      take: 20,
    })
  },

  async countByUser(userId: string) {
    return prisma.document.count({
      where: { userId },
    })
  },
}
