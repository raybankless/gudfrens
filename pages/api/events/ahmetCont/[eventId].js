// /pages/api/events/updateContribution/[eventId].js
import dbConnect from "../../../../utils/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  console.log("API Request received for updateContribution", req.query.eventId);
  const {
    query: { eventId },
    body,
  } = req;

  const { walletAddress, newMeasurement, newUnit, newProof } = body;



  await dbConnect();

  if (req.method === "POST") {
    try {
      // Using findOneAndUpdate to specifically target and update the subdocument
       let updatedEvent;

      if (newMeasurement && newUnit) {

          const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId, "allowListed.wallet": walletAddress },
            {
              $set: {
                "allowListed.$.measurement": newMeasurement,
                "allowListed.$.unit": newUnit,
              },
            },
            { new: true }, // Return the updated document
          );
          console.log("UpdatedEvent 1 : ", updatedEvent);

      } else if (newProof) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId, "allowListed.wallet": walletAddress },
          {
            $set: {
              "allowListed.$.proof": newProof,
            },
          },
          { new: true }, // Return the updated document
        );
        console.log("updatedEvent 2 : ", updatedEvent);
      }

      if (!updatedEvent) {

        return res.status(404).json({
          success: false,
          message: "Event not found or wallet not in allowListed",
        });

      }


      res.status(200).json({
        success: true,
        message: "Contribution updated successfully",
        event: updatedEvent,
      });
    } catch (error) {
      res.status(400).json({ success: false, error: error.toString() });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
