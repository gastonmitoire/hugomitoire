import { NextRequest, NextResponse } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";

export async function updateUser(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;

    if (!id) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing user id",
      };

      return new NextResponse(JSON.stringify(errorResponse), {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        username: data.username,
        passwordHash: data.passwordHash,
        email: data.email,
        role: data.role,
      },
    });

    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error updating the user",
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function deleteUser(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
): Promise<NextResponse> {
  try {
    const { id } = params;

    if (!id) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing user id",
      };

      return new NextResponse(JSON.stringify(errorResponse), {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });

    return new NextResponse(JSON.stringify(deletedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error deleting the user",
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { updateUser as PUT, deleteUser as DELETE };
