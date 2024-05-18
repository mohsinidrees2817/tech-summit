import Property from "../models/propertyModel.js";
import Listing from "../models/propertyModel.js";
import { errorHandler } from "../utils/error.js";

export const getListing = async (req, res, next) => {
  try {
    // const listing = await Listing.findById(req.params.id);
    const listing = await Listing.findById(req.params.id, {
      address: 0,
      upload: 0,
    });

    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    console.log(req.query, "req.body");
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";
    const uploadStatus = true;

    let listings;

    listings = await Listing.find(
      {
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
        uploadStatus,
      },
      { address: 0, upload: 0 } // Exclude address and upload attributes
    )
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(listings);

    // const listings = await Listing.find({
    //   name: { $regex: searchTerm, $options: "i" },
    //   offer,
    //   furnished,
    //   parking,
    //   type,
    // })
    //   .sort({ [sort]: order })
    //   .limit(limit)
    //   .skip(startIndex);

    // return res.status(200).json(listings);
    // console.log(listings, "listings");
  } catch (error) {
    next(error);
  }
};

export default {
  getListing,
  getListings,
};
