import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import axios, { AxiosError } from "axios"

import { config } from "../utils/envConfig"

// GET /github - Fetch user profile data
export const fetchUserData = async (request: Request, response: Response) => {
  try {
    const apiRequest = await axios({
      method: "GET",
      url: `${config.githubApiUrl}/users/${config.githubUsername}`,
      headers: {
        Authorization: `token ${config.githubAccessToken}`,
      },
    })

    const userData = apiRequest.data

    response.status(StatusCodes.OK).json(userData)
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch user data" })
  }
}

// GET /github/:repo-name - Fetch repository details
export const fetchRepoDetails = async (
  request: Request,
  response: Response
) => {
  const repoName = request.params.repo

  try {
    const apiRequest = await axios({
      method: "GET",
      url: `${config.githubApiUrl}/repos/${config.githubUsername}/${repoName}`,
      headers: {
        Authorization: `token ${config.githubAccessToken}`,
      },
    })

    const repoData = apiRequest.data

    response.status(StatusCodes.OK).json(repoData)
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch repository details" })
  }
}

// POST /github/:repo/issues - Create an issue in a repo
export const createIssue = async (
  request: Request,
  response: Response | any
) => {
  const repoName = request.params.repo
  const { title, body } = request.body

  try {
    const apiRequest = await axios({
      method: "POST",
      url: `${config.githubApiUrl}/repos/${config.githubUsername}/${repoName}/issues`,
      headers: {
        Authorization: `token ${config.githubAccessToken}`,
        "Content-Type": "application/json",
      },
      data: { title, body },
    })

    const issueData = apiRequest.data

    response.status(StatusCodes.CREATED).json({ issue_url: issueData.html_url })
  } catch (error: any | AxiosError) {
    if (error.response) {
      if (error.response.status === StatusCodes.NOT_FOUND) {
        return response
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Repository not found" })
      } else {
        return response
          .status(error.response.status)
          .json({ error: error.response.data.message })
      }
    }

    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create an issue" })
  }
}
