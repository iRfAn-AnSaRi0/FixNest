import Card, { CardHeader, CardBody } from "../ui/Card"
import { useState, useEffect } from "react"
import { OverviewApi } from "../../services/DashboardApi"
import Badge from "../ui/Badges"

const Overview = () => {

     const [data, setData] = useState();

     useEffect(() => {
         const fetchDate = async () => {
             try {
                 const res = await OverviewApi();
                  console.log(res.data.data);
                 setData(res.data.data);
             } catch (error) {
                 console.error(error.response);

             }
         }
         fetchDate();
     }, []);

    return (
        <section className="bg-surface py-8">

            {/* 🔥 Section Heading */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-text">
                    Overview
                </h2>
                <p className="text-sm text-muted">
                    Summary of your business performance
                </p>
            </div>

            {/* 🔹 Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>Total Profit</CardHeader>
                    <CardBody className="text-success">{data?.totalProfit}</CardBody>
                </Card>
                <Card>
                    <CardHeader>Total Revenue</CardHeader>
                    <CardBody>{data?.totalRevenue}</CardBody>
                </Card>
                <Card>
                    <CardHeader>Today’s Bookings</CardHeader>
                    <CardBody>{data?.todayBookings || 0}</CardBody>
                </Card>
                <Card>
                    <CardHeader>Total Bookings</CardHeader>
                    <CardBody>{data?.totalBookings || 0}</CardBody>
                </Card>
                <Card>
                    <CardHeader>Today Profit</CardHeader>
                    <CardBody className="text-success">{data?.todayProfit || 0}</CardBody>
                </Card>
                <Card>
                    <CardHeader>Today Revenue</CardHeader>
                    <CardBody>{data?.todayRevenue || 0}</CardBody>
                </Card>
            </div>

        </section>
    )
}

export default Overview