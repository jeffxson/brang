import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { useGetSystemHealth } from "services/query/systemHealth"
import { useState } from "react"
import { useEffect } from "react"
import { Box } from "@chakra-ui/react"

ChartJS.register(ArcElement, Tooltip, Legend)

export function DoughnutChart() {
  const [healthCheck, setHealthCheck] = useState([])
  const [pingHealth, setPingHealth] = useState([])
  const [database, setDatabase] = useState([])
  const [fileStorage, setFileStorage] = useState([])
  const [disk, setDisk] = useState([])
  const [memory, setMemory] = useState([])
  const [migration, setMigration] = useState([])
  const [redis, setRedis] = useState([])
  const { data: systemHealth } = useGetSystemHealth()
  const systemStatus = systemHealth?.services

  const data = {
    labels: [
      "Celery Health Check",
      "Celery Ping Health Check",
      "Database Backend",
      "Default File Storage Health Check",
      "Disk Usage",
      "Memory Usage",
      "Migrations Health Check",
      "Redis Health Check",
    ],
    datasets: [
      {
        data: [
          healthCheck,
          pingHealth,
          database,
          fileStorage,
          disk,
          memory,
          migration,
          redis,
        ],
        backgroundColor: [
          "orange",
          "blue",
          "green",
          "yellow",
          "indigo",
          "violet",
          "red",
        ],
        borderColor: [
          "orange",
          "blue",
          "green",
          "yellow",
          "indigo",
          "violet",
          "red",
        ],
        borderWidth: 1,
      },
    ],
  }

  useEffect(() => {
    const healthData = systemStatus?.CeleryHealthCheckCelery?.response_time
    const ping = systemStatus?.CeleryPingHealthCheck?.response_time
    const db = systemStatus?.DatabaseBackend?.response_time
    const file = systemStatus?.DefaultFileStorageHealthCheck?.response_time
    const disc = systemStatus?.DiskUsage?.response_time
    const memoryData = systemStatus?.MemoryUsage?.response_time
    const migrationData = systemStatus?.MigrationsHealthCheck?.response_time
    const redisData = systemStatus?.RedisHealthCheck?.response_time

    setHealthCheck(healthData)
    setPingHealth(ping)
    setDatabase(db)
    setFileStorage(file)
    setDisk(disc)
    setMemory(memoryData)
    setMigration(migrationData)
    setRedis(redisData)
  }, [data])

  return (
    <Box width="100%">
      <Doughnut data={data} width="100%" />
    </Box>
  )
}
